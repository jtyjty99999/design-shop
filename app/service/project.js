'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_project', {
        m_pic:obj.m_pic,
        type: obj.type,
        title: obj.title,
        content:obj.content,
        timestamp: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    // 获取文章列表
    * list(pageNum, pageSize) {
      const articles = yield app.mysql.query('select  id,title,  m_pic, content, type from design_project order by timestamp desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);
      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_project', { id });

      return article;
    }

    // 获取某一类的project
    * search(type) {
      const article = yield app.mysql.query('select  id,title,  m_pic, content, type from design_project where type = ? order by timestamp desc', [ type ]);

      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_project');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_project', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteProject(id) {
      const result = yield app.mysql.update('design_project', {
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
