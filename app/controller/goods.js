'use strict';

const moment = require('moment');
const marked = require('marked');
const counter = require('../lib/count');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 100;

  const result = yield {
    all: this.service.goods.list(pageNum, pageSize),
    wear: this.service.goods.search('wear'),
    eat: this.service.goods.search('eat'),
    live: this.service.goods.search('live'),
    travel: this.service.goods.search('travel'),
    count: this.service.goods.count(),
    current: 'goods'
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

  const description = this.request.body.description;
  const price = this.request.body.price;
  const whole = this.request.body.whole;
  const subtitle = this.request.body.subtitle;
  const in_pic = this.request.body.in_pic;
  const color = this.request.body.color;
  const weight = this.request.body.weight;


  if (typeof type === 'object') {
    type = type.join(',');
  }
  if (method === 'PUT') {
    yield this.service.goods.update({
      id,
      m_pic,
      content,
      type,
      title,
      description,
      price,
      whole,
      subtitle,
      in_pic,
      color,
      weight
    });
  } else {
    yield this.service.goods.insert({
      content,
      m_pic,
      type,
      title,
      description,
      price,
      whole,
      subtitle,
      in_pic,
      color,
      weight
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
  const weight = this.request.body.weight;
  if (typeof type === 'object') {
    type = type.join(',');
  }
  yield this.service.goods.update({
    id,
    m_pic,
    content,
    type,
    title,
    weight
  });

  this.redirect(`/manager`);

};

// 删除一个文章
exports.deleteGoods = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.goods.deleteGoods(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};

exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.goods.find(id);
  article.color = article.color && article.color.split(',');
  article.in_pic = article.in_pic && article.in_pic.split(',');
  yield this.render('goods-info.html', {
    good: article
  });

};


exports.countDelivery = function* () {
  let goods = yield this.service.cart.list(this.session.user.id);
  let address = this.request.body.address;

  for (let i = 0, l = goods.length; i < l; i++) {
    let goodsInfo = yield this.service.goods.find(goods[i].goods_id);
    Object.assign(goods[i], goodsInfo);
  }

  let total = counter(goods, address);
  this.body = {
    total: total
  };
}