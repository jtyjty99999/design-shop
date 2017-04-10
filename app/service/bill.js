'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_bill', {
        user_id:obj.user_id,
        status: obj.status,
        total:obj.total,
        create_time: app.mysql.literals.now,
        info: obj.info,
        address: obj.address,
        country: obj.country,
        name: obj.name,
        email: obj.email,
        phone: obj.phone,
        deleted: 0
      });

      return result;
    }

    // 获取文章列表
    // 获取文章列表
    * list(user_id, pageNum, pageSize) {
      const articles = yield app.mysql.query('select  id,  status, total, create_time, info, address,country,name,email,phone,shipping_code from design_bill where user_id = ? and deleted = 0 order by create_time desc limit ? offset ?;', [ user_id, pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }

    // 获取文章列表
    // 获取文章列表
    * listAll(pageNum, pageSize) {
      const articles = yield app.mysql.query('select  id,  status, total, create_time, info, address,country,name,email,phone,shipping_code from design_bill where deleted = 0 order by create_time desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }


    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_bill', { id });

      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_bill');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_bill', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteBill(id) {
      const result = yield app.mysql.update('design_bill', {
        id:id,
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
