'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    all: this.service.goods.list(pageNum, pageSize),
    wear: this.service.goods.search('wear'),
    eat: this.service.goods.search('eat'),
    live: this.service.goods.search('live'),
    travel: this.service.goods.search('travel'),
    count: this.service.goods.count(),
    current:'goods'
  };
  yield this.render('goods.html', Object.assign({
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
    yield this.service.goods.update({
      id,
      m_pic,
      content,
      type,
      title
    });
  }else{
    yield this.service.goods.insert({
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
  const type = this.request.body.type;
  const title = this.request.body.title;

  yield this.service.goods.update({
    id,
    m_pic,
    content,
    type,
    title
  });

  this.redirect(`/manager`);

};

// 删除一个文章
exports.deleteGoods = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.goods.deleteGood(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};

exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.goods.find(id);
  console.log(article);
  yield this.render('goods-info.html', article);

};