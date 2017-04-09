'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_cart', {
        user_id:obj.user_id,
        goods_id: obj.goods_id,
        material: obj.material,
        quantity: obj.quantity,
        timestamp: app.mysql.literals.now
      });

      return result.affectedRows === 1;
    }

    // 获取购物车内产品
    * find(user_id) {
      const article = yield app.mysql.get('design_cart', { user_id });

      return article;
    }

    // 获取文章列表
    * list(user_id) {
      const articles = yield app.mysql.query('select  id,goods_id,  material, quantity, timestamp from design_cart where user_id = ? ;', [ user_id ]);
      return articles;
    }

    * remove(data) {
      const result = yield app.mysql.delete('design_cart', data);

      return result.affectedRows === 1;
    }  

    * update(data) {
      const result = yield app.mysql.update('design_cart', data);

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
