'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(obj) {
      const result = yield app.mysql.insert('design_job', {
        title:obj.title,
        content:obj.content,
        type:obj.type,
        timestamp: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    // 获取某一类的job
    * search(type) {
      const article = yield app.mysql.query('select  id,title,type, content from design_job where type like \'%' + type + '%\' and deleted = 0 order by timestamp desc', [ type ]);
      return article;
    }

    // 获取文章列表
    * list(pageNum, pageSize) {
      const articles = yield app.mysql.query('select  id, title,type, content from design_job where deleted = 0 order by timestamp desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);

      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('design_job', { id });

      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from design_job');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('design_job', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteJob(id) {
      const result = yield app.mysql.update('design_job', {
                id:id,
        deleted:1,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
