'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_address', {
        user_id:obj.user_id,
        address: obj.address,
        country:obj.country,
        postcode: obj.postcode,
        contact_name: obj.contact_name,
        contact_phone: obj.contact_phone,
        contact_email: obj.contact_email,        
        deleted: 0
      });

      return result.affectedRows === 1;
    }

    // 获取文章列表
    // 获取文章列表
    * list(user_id, pageNum, pageSize) {
      const articles = yield app.mysql.query('select * from design_address where user_id = ? and deleted = 0 limit ? offset ?;', [user_id, pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_address', { id });

      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_address');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_address', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteAddress(id) {
      const result = yield app.mysql.update('design_address', {
        id:id,
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
