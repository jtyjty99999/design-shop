'use strict';

const moment = require('moment');
const fs = require('fs');
const path = require('path');

function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filepath);
    stream.pipe(ws);
    ws.on('error', reject);
    ws.on('finish', resolve);
  });
}

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


exports.video = function* () {

  yield this.render('video.html');
};

exports.home = function* () {

  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 100;

  const result = yield {
    projects: this.service.project.list(pageNum, pageSize),
  };
  result.projects = result.projects.slice(0,4);
  yield this.render('home.html', result);
};

exports.about = function* () {
  const result = {
    current: 'about'
  };
  yield this.render('about.html', result);
};

exports.privacy = function* () {
  const result = {
    current: 'privacy'
  };
  yield this.render('privacy.html', result);
};

exports.return = function* () {
  const result = {
    current: 'return'
  };
  yield this.render('return.html', result);
};

exports.contact = function* () {
  let site =  yield this.service.site.getSite();
  yield this.render('contact.html', {site:site[0]});
};

exports.upload = function* () {

  const stream = yield this.getFileStream();
  const filepath = path.join(this.app.config.logger.dir, 'multipart-test-file');
  yield saveStream(stream, filepath);
  const self = this;
  console.log(stream.filename);
  console.log(fs.readFileSync(filepath));
  const plus = 'http://pic-cloud-hn.b0.upaiyun.com/';
  const filename = moment(Date.now()).format('YYYY-MM-DD') + '/' + stream.filename;
  let result = yield this.app.upyun.putFile(filename, fs.readFileSync(filepath), 'text/plain', true, null);
    console.log(plus + filename);
    if (result) {
      this.body = plus + filename;
    } else {
      this.body = '上传失败';
    }

  //const object = yield this.app.upyun.put(moment(Date.now()).format('YYYY-MM-DD') + '/' + stream.filename, stream);

};