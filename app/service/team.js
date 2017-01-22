'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_team', {
        description:obj.description,
        name: obj.name,
        position:obj.position,
        m_pic:obj.m_pic,
        in_pic:obj.in_pic,
        timestamp: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    // 获取文章列表
    * list(pageNum, pageSize) {
      const articles = yield app.mysql.query('select  id,  m_pic,in_pic, name, position,description from design_team order by timestamp desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_team', { id });

      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_team');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_team', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteTeam(id) {
      const result = yield app.mysql.update('design_team', {
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
