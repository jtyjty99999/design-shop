'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_goods', {
        m_pic:obj.m_pic,
        type: obj.type,
        title: obj.title,
        content:obj.content,
        price:obj.price,
        subtitle:obj.subtitle,
        in_pic:obj.in_pic,
        whole :obj.whole,
        description :obj.description,
        color :obj.color,
        timestamp: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    // 获取文章列表
    * list(pageNum, pageSize) {
      const articles = yield app.mysql.query('select  id,title,  m_pic, content, type,price from design_goods where deleted = 0 order by timestamp desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_goods', { id });

      return article;
    }

    // 获取某一类的project
    * search(type) {
      const article = yield app.mysql.query('select  id,title,  m_pic, content, type from design_goods where type like \'%' + type + '%\' and deleted = 0 order by timestamp desc', [ type ]);
      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_goods');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_goods', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteGoods(id) {
      const result = yield app.mysql.update('design_goods', {
        id:id,
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
