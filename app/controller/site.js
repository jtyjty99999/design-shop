'use strict';

let isInstall = false;

const installRule = {
  name: {
    type: 'string',
  },
  email: {
    type: 'email',
  },
  password: {
    type: 'password',
  },
  about: {
    required: false,
    type: 'string',
  },
  sub_name: {
    required: false,
    type: 'string',
  },
};


exports.update = function* () {
  const retailer = this.request.body.retailer;
  const cooperation = this.request.body.cooperation;
  const main_pics = this.request.body.main_pics;
  const main_links = this.request.body.main_links;
  const main_texts = this.request.body.main_texts;
  const site = yield this.service.site.getSite();

  yield this.service.site.update({
    retailer,
    cooperation,
    id:site[0].id,
    main_links,
    main_pics,
    main_texts
  });

  this.redirect(`/manager`);
};

exports.adminLogin = function* () {
  const login = this.session.adminLogin;

  if (login) {
    this.redirect('/manager');
  } else {
    yield this.render('admin/login.html');
  }

};

exports.adminLogout = function* () {
  this.session.adminLogin = false;

  yield this.render('admin/login.html');

};

exports.about = function* () {
  const site = yield this.service.site.getSite();
  yield this.render('about.html', {
    about: site.length ? site[0].about : '',
  });
};

exports.error = function* () {
  yield this.render('500.html');
};

// 判断是否已经安装博客
exports.isInstall = function* (next) {

  if (isInstall) {
    yield next;
  } else {
    // 查询数据库是否已经安装过
    const isInstallByDB = yield this.service.site.count();
    if (isInstallByDB) {
      isInstall = true;
      yield next;
    } else {
      this.redirect('/install');
    }
  }
};

exports.startInstall = function* () {
  yield this.render('install.html', {
    isInstall,
  });
};

exports.notFound = function* () {
  this.status = 404;
  yield this.render('404.html');
};

exports.install = function* () {
  this.validate(installRule);

  const name = this.request.body.name;
  const email = this.request.body.email;
  const password = this.request.body.password;
  const about = this.request.body.about;
  const sub_name = this.request.body.sub_name;
  yield this.service.site.insert(name, email, password, about, sub_name);


  isInstall = true;

  this.redirect('/manager');
};
