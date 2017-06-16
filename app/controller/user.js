'use strict';

const loginRule = {
  name: 'string',
  password: 'password',
};

exports.islogin = function* () {
  this.body = {
    login: this.session.login,
    username: this.session.login ? (this.session.user.nick || this.session.user.username) : ''
  };
}

exports.login = function* () {
  this.validate(loginRule);
  const name = this.request.body.name;
  const password = this.request.body.password;
  const login = yield this.service.user.login(name, password);

  if (login) {
    this.session.login = true;
    this.session.user = login;
    this.body = {
      "success": true,
      "msg": ''
    }
    // this.redirect('/manager');
  } else {
    this.body = {
      "success": false,
      "msg": "wrong"
    }
  }
};
exports.logout = function* () {
  this.session.user = null;
  this.session.login = false;
  this.redirect('/');
}

exports.update = function* () {
  const id = this.session.user.id
  const phone = this.request.body.phone;
  const email = this.request.body.email;
  const nick = this.request.body.nick;
  const pic = this.request.body.pic;

  let res;
  if (pic) {
    res = yield this.service.user.update({
      id,
      pic,
    });
  } else {
    res = yield this.service.user.update({
      id,
      phone,
      email,
      nick,
    });
  }

  this.session.user = yield this.service.user.find(this.session.user.id);
  this.body = {
    success: true,
    msg: ""
  };

};

exports.profile = function* () {
  /*
  if (!this.session.login) {
    this.redirect('/');
  }*/
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 100;

  let addressnotfull;
  // 订单信息
  let bills = yield this.service.bill.list(this.session.user.id, pageNum, pageSize);
  bills.forEach((bill) => {
    bill.info = JSON.parse(bill.info);
  })
  // 地址信息
  let addresses = yield this.service.address.list(this.session.user.id, pageNum, pageSize);
  if (addresses.length < 3) {
    addressnotfull = true;
  } else {
    addressnotfull = false;
  }
  // let bills = [1, 2, 3];
  yield this.render('profile.html', {
    user: this.session.user,
    bills: bills,
    addresses: addresses,
    addressnotfull
  });

}

exports.registry = function* () {
  this.validate(loginRule);

  const name = this.request.body.name;
  const password = this.request.body.password;
  let res = yield this.service.user.insert(name, password);

  //错误处理
  if (!res) {
    // 注册失败
    this.body = {
      success: false,
      msg: "exist user"
    };
  } else {
    this.session.user = yield this.service.user.login(name, password);
    this.body = {
      success: true,
      msg: ""
    };
  }

};
