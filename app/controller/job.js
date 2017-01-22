'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.job.list(pageNum, pageSize),
    count: this.service.job.count(),
  };

  yield this.render('job.html', Object.assign({
    pageNum,
    pageSize,
  }, result));

};

// 新增一个job
exports.add = function* () {
  const title = this.request.body.title;
  const content = this.request.body.content;
  yield this.service.job.insert({
      title,
      content
  });

  this.redirect('/manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const content = this.request.body.content;

  yield this.service.job.update({
    id,
    title,
    content,
  });

  this.redirect(`/manager`);

};

// 删除一个文章
exports.deleteJob = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.job.deleteJob(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};
/*
exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.job.find(id);

  article.fromNow = moment(article.modified_time).fromNow();
  article.html = marked(article.content);

  yield this.render('post.html', article);

};
*/