'use strict';

const loginRule = {
  email: 'email',
  password: 'password',
};

exports.login = function* () {
  this.validate(loginRule);
  const email = this.request.body.email;
  const password = this.request.body.password;
  const login = yield this.service.site.login(email, password);

  if (login) {
    this.session.adminLogin = true;
    this.redirect('/manager');
  } else {
    yield this.render('admin/login.html', {
      msg: 'email or password is wrong',
    });
  }

};

exports.editorJob = function* () {
  const articleID = parseInt(this.query.jobID);
  let article = null;
  let isNew = true;

  if (articleID) {
    article = yield this.service.job.find(articleID);
  }

  if (articleID && article) {
    isNew = false;
  }
  yield this.render('admin/editor-job.html', {
    article,
    isNew,
    login: this.session.adminLogin,
  });

};

exports.editorPress = function* () {
  const articleID = parseInt(this.query.pressID);
  let article = null;
  let isNew = true;

  if (articleID) {
    article = yield this.service.press.find(articleID);
  }
  
  if (articleID && article) {
    isNew = false;
  }
  yield this.render('admin/editor-press.html', {
    article,
    isNew,
    login: this.session.adminLogin,
  });

};
exports.editorNews = function* () {
  const articleID = parseInt(this.query.newsID);
  let article = null;
  let isNew = true;

  if (articleID) {
    article = yield this.service.news.find(articleID);
  }

  if (articleID && article) {
    isNew = false;
  }
  yield this.render('admin/editor-news.html', {
    article,
    isNew,
    login: this.session.adminLogin,
  });

};
exports.editorTeam = function* () {
  const articleID = parseInt(this.query.teamID);
  let article = null;
  let isNew = true;

  if (articleID) {
    article = yield this.service.team.find(articleID);
  }

  if(articleID &&article&&article.tag){

    if(article.tag.indexOf('hangzhou')!==-1){
      article.ishangzhou = true;
    }
    if(article.tag.indexOf('london')!==-1){
      article.islondon = true;
    }
    if(article.tag.indexOf('losa')!==-1){
      article.islosa = true;
    }
    if(article.tag.indexOf('design')!==-1){
      article.isdesign = true;
    }
    if(article.tag.indexOf('business')!==-1){
      article.isbusiness = true;
    }
    if(article.tag.indexOf('research')!==-1){
      article.isresearch = true;
    }
    if(article.tag.indexOf('brand')!==-1){
      article.isbrand = true;
    }

  }


  if (articleID && article) {
    isNew = false;
  }
  yield this.render('admin/editor-team.html', {
    article,
    isNew,
    login: this.session.adminLogin,
  });

};
exports.editorProject = function* () {
  const articleID = parseInt(this.query.projectID);
  let article = null;
  let isNew = true;

  if (articleID) {
    article = yield this.service.project.find(articleID);
  }

  if(articleID &&article&&article.type){

    if(article.type.indexOf('eat')!==-1){
      article.iseat = true;
    }
    if(article.type.indexOf('live')!==-1){
      article.islive = true;
    }
    if(article.type.indexOf('travel')!==-1){
      article.istravel = true;
    }
    if(article.type.indexOf('wear')!==-1){
      article.iswear = true;
    }

  }
  console.log(article)

  if (articleID && article) {
    isNew = false;
  }
  console.log(article);
  yield this.render('admin/editor-project.html', {
    article,
    isNew,
    login: this.session.adminLogin,
  });

};

exports.editorGoods = function* () {
  const articleID = parseInt(this.query.goodID);
  let article = null;
  let isNew = true;

  if (articleID) {
    article = yield this.service.goods.find(articleID);
  }

  if(articleID &&article&&article.type){

    if(article.type.indexOf('eat')!==-1){
      article.iseat = true;
    }
    if(article.type.indexOf('live')!==-1){
      article.islive = true;
    }
    if(article.type.indexOf('travel')!==-1){
      article.istravel = true;
    }
    if(article.type.indexOf('wear')!==-1){
      article.iswear = true;
    }

  }
  console.log(article)

  if (articleID && article) {
    isNew = false;
  }
  console.log(article);
  yield this.render('admin/editor-good.html', {
    article,
    isNew,
    login: this.session.adminLogin,
  });

};



exports.manager = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 100;

  const result = yield {
    projects: this.service.project.list(pageNum, pageSize),
    news: this.service.news.list(pageNum, pageSize),
    jobs: this.service.job.list(pageNum, pageSize),
    teams: this.service.team.list(pageNum, pageSize),
    presses: this.service.press.list(pageNum, pageSize),
    goods: this.service.goods.list(pageNum, pageSize),
  };

  yield this.render('admin/manager.html', Object.assign({
    pageNum,
    pageSize,
    login: this.session.adminLogin,
  }, result));
};
