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


exports.home = function* () {
  const result = {};
  yield this.render('home.html', result);
};

exports.about = function* () {
  const result = {
    current: 'about'
  };
  yield this.render('about.html', result);
};

exports.contact = function* () {
  const result = {
    current: 'contact'
  };
  yield this.render('contact.html', result);
};

exports.upload = function* () {

  const stream = yield this.getFileStream();
  const filepath = path.join(this.app.config.logger.dir, 'multipart-test-file');
  yield saveStream(stream, filepath);
  const self = this;
  const plus = 'http://pic-cloud-hn.b0.upaiyun.com/';
  const filename = moment(Date.now()).format('YYYY-MM-DD') + '/' + stream.filename;
  let result = yield this.app.upyun.putFile(filename, fs.readFileSync(filepath), 'text/plain', true, null);
    console.log(plus + filename);
    if (result) {
      this.body = '上传成功!url是: '+ plus + filename;
    } else {
      this.body = '上传失败';
    }

  //const object = yield this.app.upyun.put(moment(Date.now()).format('YYYY-MM-DD') + '/' + stream.filename, stream);

};