'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 100;

  const result = yield {
    all: this.service.project.list(pageNum, pageSize),
    wear: this.service.project.search('wear'),
    eat: this.service.project.search('eat'),
    live: this.service.project.search('live'),
    travel: this.service.project.search('travel'),
    count: this.service.project.count(),
    current:'project'
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
  let type = this.request.body.type;
  const title = this.request.body.title;
  const id = this.request.body.id;
  const method = this.request.body.method;
  if(typeof type === 'object'){
    type = type.join(',');
  }
  if(method ==='PUT'){
    yield this.service.project.update({
      id,
      m_pic,
      content,
      type,
      title
    });
  }else{
    yield this.service.project.insert({
        content,
        m_pic,
        type,
        title
    });

  }

  this.redirect('/manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const m_pic = this.request.body.m_pic;
  const content = this.request.body.content;
  let type = this.request.body.type;
  const title = this.request.body.title;
  if(typeof type === 'object'){
    type = type.join(',');
  }
  yield this.service.project.update({
    id,
    m_pic,
    content,
    type,
    title
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

exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.project.find(id);
  yield this.render('project-info.html', article);

};
