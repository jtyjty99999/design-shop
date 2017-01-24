'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.team.list(pageNum, pageSize),
    count: this.service.team.count(),
    hangzhou: this.service.team.search('hangzhou'),
    london: this.service.team.search('london'),
    losa: this.service.team.search('losa'),
    brand: this.service.team.search('brand'),
    business: this.service.team.search('business'),
    research: this.service.team.search('research'),
    design: this.service.team.search('design'),
    current:'team'
  };

  yield this.render('team.html', Object.assign({
    pageNum,
    pageSize,
  }, result));

};

// 新增一个文章
exports.add = function* () {
  const name = this.request.body.name;
  const description = this.request.body.description;
  const position = this.request.body.position;
  const m_pic = this.request.body.m_pic;
  const content = this.request.body.content;
  let tag = this.request.body.tag;
  const id = this.request.body.id;
  const method = this.request.body.method;
  tag = tag.join(',');
  if(method ==='PUT'){
    yield this.service.team.update({
      id,
      name,
      description,
      position,
      m_pic,
      content,
      tag
    });

  }else{
    yield this.service.team.insert({
        name,
        description,
        position,
        m_pic,
        content,
        tag
    });


  }


  this.redirect('/manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const name = this.request.body.name;
  const description = this.request.body.description;
  const position = this.request.body.position;
  const m_pic = this.request.body.m_pic;
  const content = this.request.body.content;
  const tag = this.request.body.tag;
  yield this.service.team.update({
    id,
    name,
    description,
    position,
    m_pic,
    content,
    tag
  });

  this.redirect(`/manager`);

};

// 删除一个文章
exports.deleteTeam = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.team.deleteNews(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};


exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.team.find(id);
  this.body = article;
};
