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
    this.session.login = true;
    this.redirect('/manager');
  } else {
    yield this.render('admin/login.html', {
      msg: 'email or password is wrong',
    });
  }

};
exports.logout = function* () {
  this.session.user = null;
  this.redirect('/');
}


exports.profile = function* () {
  if (this.session.user) {
    this.redirect('/');
  }

  yield this.render('person.html', {
    user: this.session.user,
  });

}