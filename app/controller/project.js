'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.project.list(pageNum, pageSize),
    count: this.service.project.count(),
  };

  yield this.render('project.html', Object.assign({
    pageNum,
    pageSize,
  }, result));

};

// 新增一个文章
exports.add = function* () {
  const m_pic = this.request.body.m_pic;
  const content = this.request.body.content;
  const type = this.request.body.type;
  const id = this.request.body.id;
  const method = this.request.body.method;
  if(method ==='PUT'){
    yield this.service.project.update({
      id,
      m_pic,
      content,
      type,
    });
  }else{
    yield this.service.project.insert({
        content,
        m_pic,
        type
    });

  }



  this.redirect('/manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const m_pic = this.request.body.m_pic;
  const content = this.request.body.content;
  const type = this.request.body.type;

  yield this.service.project.update({
    id,
    m_pic,
    content,
    type,
  });

  this.redirect(`/manager`);

};

// 删除一个文章
exports.deleteProject = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.project.deleteProject(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};
/*

exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.article.find(id);

  article.fromNow = moment(article.modified_time).fromNow();
  article.html = marked(article.content);

  yield this.render('post.html', article);

};
*/