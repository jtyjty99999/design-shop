'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_team', {
        description:obj.description,
        name: obj.name,
        position:obj.position,
        m_pic:obj.m_pic,
        content:obj.content,
        tag:obj.tag,
        timestamp: app.mysql.literals.now,
      });
      console.log(result)

      return result.affectedRows === 1;
    }

    // 获取文章列表
    * list(pageNum, pageSize) {
      const articles = yield app.mysql.query('select  id, tag ,m_pic,content, name, position,description from design_team where deleted = 0 order by id asc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }
    // 获取某一类的team
    * search(type) {
      type = '%'+type+'%';
      const article = yield app.mysql.query('select  id, tag ,m_pic,content, name, position,description from design_team where tag like ? and deleted = 0  order by id asc', [ type ]);

      return article;
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
        id:id,
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
