'use strict';

const moment = require('moment');
const marked = require('marked');

// 新增订单
exports.add = function* () {
  const title = this.request.body.title;
  const m_pic = this.request.body.m_pic;
  const in_pic = this.request.body.in_pic;
  const id = this.request.body.id;
  const method = this.request.body.method;
  if(method ==='PUT'){
    yield this.service.bill.update({
      id,
      title,
      m_pic,
      in_pic,
    });
  }else{
    yield this.service.bill.insert({
        title,
        m_pic,
        in_pic
    });
  }

  this.body = {
      success: 'true'
  }

};

// 更新订单状态
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const m_pic = this.request.body.m_pic;
  const in_pic = this.request.body.in_pic;


  yield this.service.bill.update({
    id,
    title,
    m_pic,
    in_pic,
  });

  this.body = {
      success: 'true'
  }
};

// 删除一个订单
exports.deleteBill = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.bill.deleteBill(id);

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