'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 100;

  const result = yield {
    all: this.service.job.list(pageNum, pageSize),
    brand: this.service.job.search('brand'),
    business: this.service.job.search('business'),
    research: this.service.job.search('research'),
    design: this.service.job.search('design'),
    count: this.service.job.count(),
    current:'job'
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
  const method = this.request.body.method;
  let type = this.request.body.type;
  const id = this.request.body.id;
  const description = this.request.body.description;
  if(typeof type === 'object'){
    type = type.join(',');
  }
  if(method ==='PUT'){
    console.log(999999);
    console.log(title,content, type,description)
    yield this.service.job.update({
      id,
      title,
      content,
      type,
      description
    });
  }else{
    yield this.service.job.insert({
        title,
        content,
        type,
        description
    });

  }


  this.redirect('/manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const content = this.request.body.content;
  const description = this.request.body.description;
  let type = this.request.body.type;
  if(typeof type === 'object'){
    type = type.join(',');
  }
  yield this.service.job.update({
    id,
    title,
    content,
    type,
    description
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