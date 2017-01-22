'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.press.list(pageNum, pageSize),
    count: this.service.press.count(),
  };

  yield this.render('press.html', Object.assign({
    pageNum,
    pageSize,
  }, result));

};

// 新增一个文章
exports.add = function* () {
  const title = this.request.body.title;
  const m_pic = this.request.body.m_pic;
  const in_pic = this.request.body.in_pic;
  const id = this.request.body.id;
  const method = this.request.body.method;
  if(method ==='PUT'){
    yield this.service.press.update({
      id,
      title,
      m_pic,
      in_pic,
    });
  }else{
    yield this.service.press.insert({
        title,
        m_pic,
        in_pic
    });
  }

  this.redirect('/manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const m_pic = this.request.body.m_pic;
  const in_pic = this.request.body.in_pic;


  yield this.service.press.update({
    id,
    title,
    m_pic,
    in_pic,
  });

  this.redirect(`/manager`);

};

// 删除一个文章
exports.deletePress = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.press.deletePress(id);

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