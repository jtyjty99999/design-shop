'use strict';

module.exports = app => {
  app.role.use('admin', function() {
    const login = this.session.adminLogin;
    if (login) {
      return true;
    }
    return false;
  });
};

