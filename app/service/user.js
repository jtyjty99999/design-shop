'use strict';

const crypto = require('crypto');

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(name, password) {
      const md5Password = crypto.createHash('md5').update(password).digest('hex');
      const result = yield app.mysql.insert('design_user', {
        username: name,
        password: md5Password,
        registry_time: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    * login(username, password) {
      const md5Password = crypto.createHash('md5').update(password).digest('hex');
      const articles = yield app.mysql.query('select id, nick, phone, email, pic, username, registry_time, default_address_id from design_user where username = ? and password = ?', [ username, md5Password ]);
      return articles[0];
    }
    // 获取文章列表
    // 获取文章列表
    * list(user_id, pageNum, pageSize) {
      const articles = yield app.mysql.query('select id, nick, phone, email, pic, username, registry_time, default_address_id from design_user where user_id = ? and deleted = 0 order by create_time desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_user', { id });

      return article;
    }



    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_user');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_user', data);
      return result.affectedRows === 1;
    }

    * modifyDefaultAddress(id, user_id){
      const result = yield app.mysql.query('update design_user set default_address_id = ? where id = ?', [id, user_id]);
      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteBill(id) {
      const result = yield app.mysql.update('design_user', {
        id:id,
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
