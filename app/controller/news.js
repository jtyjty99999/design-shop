'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.news.list(pageNum, pageSize),
    count: this.service.news.count(),
  };
  console.log(result);
  yield this.render('news.html', Object.assign({
    pageNum,
    pageSize,
  }, result));

};

// 新增一个文章
exports.add = function* () {
  const title = this.request.body.title;
  const content = this.request.body.content;
  const desc = this.request.body.desc;
  const m_pic = this.request.body.m_pic;
  console.log(this.request.body);
  yield this.service.news.insert({
      title,
      content,
      desc,
      m_pic
  });

  this.redirect('/manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const content = this.request.body.content;
  const desc = this.request.body.desc;
  const m_pic = this.request.body.m_pic;
  yield this.service.news.update({
    id,
    title,
    content,
    desc,
    m_pic
  });

  this.redirect(`/manager`);

};

// 删除一个文章
exports.deleteNews = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.news.deleteNews(id);

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