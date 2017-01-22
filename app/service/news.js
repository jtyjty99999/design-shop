'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_news', {
        title:obj.title,
        description: obj.description,
        content:obj.content,
        m_pic:obj.m_pic,
        timestamp: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    // 获取文章列表
    * list(pageNum, pageSize) {
      const articles = yield app.mysql.query('select id, title, description, content, timestamp,m_pic from design_news order by timestamp desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);

      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_news', { id });

      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_news');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_news', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteNews(id) {
      const result = yield app.mysql.update('design_news', {
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
