'use strict';

exports.project = function* () {
    
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;
/*
  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
    site: this.service.site.getSite(),
  };
*/
    const result = {};
    yield this.render('project.html', Object.assign({
        pageNum,
        pageSize,
    }, result));

};

exports.shop = function* () {
    
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;
/*
  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
    site: this.service.site.getSite(),
  };
*/
    const result = {};
    yield this.render('shop.html', Object.assign({
        pageNum,
        pageSize,
    }, result));

};

exports.news = function* () {
    
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;
/*
  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
    site: this.service.site.getSite(),
  };
*/
    const result = {};
    yield this.render('news.html', Object.assign({
        pageNum,
        pageSize,
    }, result));

};


exports.press = function* () {
    
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;
/*
  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
    site: this.service.site.getSite(),
  };
*/
    const result = {};
    yield this.render('press.html', Object.assign({
        pageNum,
        pageSize,
    }, result));

};

exports.home = function* () {
    const result = {};
    yield this.render('home.html', result);
};

exports.about = function* () {
    const result = {};
    yield this.render('about.html', result);
};
exports.team = function* () {
    const result = {};
    yield this.render('team.html', result);
};
exports.job = function* () {
    const result = {};
    yield this.render('job.html', result);
};
exports.contact = function* () {
    const result = {};
    yield this.render('contact.html', result);
};