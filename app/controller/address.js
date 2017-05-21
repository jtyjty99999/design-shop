'use strict';

const moment = require('moment');
const marked = require('marked');

// 新增一个文章
exports.add = function* () {
  const postcode = this.request.body.postcode;
  const contact_email = this.request.body.contact_email;
  const contact_name = this.request.body.contact_name;
  const contact_phone = this.request.body.contact_phone;
  const country = this.request.body.country;
  const address = this.request.body.address;
  const user_id = this.session.user.id;

  yield this.service.address.insert({
    contact_email,
    contact_name,
    contact_phone,
    country,
    postcode,
    address,
    user_id
  });

  this.body = {
    success: 'true'
  }

};

exports.find = function* () {
  const id = this.request.query.id;

  const address = yield this.service.address.find(id);
  this.body = {
    success: 'true',
    address: address || {}
  }

};

exports.modifyDefaultAddress = function* () {
  const id = this.request.body.id;

  const address = yield this.service.user.modifyDefaultAddress(id, this.session.user.id);
  this.session.user = yield this.service.user.find(this.session.user.id);
  this.body = {
    success: 'true',
    address: address || {}
  }

};


// 新增一个文章
exports.update = function* () {
  const postcode = this.request.body.postcode;
  const contact_email = this.request.body.contact_email;
  const contact_name = this.request.body.contact_name;
  const contact_phone = this.request.body.contact_phone;
  const country = this.request.body.country;
  const address = this.request.body.address;
  const user_id = this.session.user.id;
  const id = this.request.body.id;

  yield this.service.address.update({
    id,
    contact_email,
    contact_name,
    contact_phone,
    country,
    postcode,
    address,
  });

  this.body = {
    success: 'true'
  }
};

// 删除一个文章
exports.deleteAddress = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.address.deleteAddress(id);

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