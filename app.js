'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var UpYun = require('upyun');
var bucket = process.env.UPYUN_BUCKET;
var username = process.env.UPYUN_USERNAME;
var password = process.env.UPYUN_PASSWORD;
var secret = process.env.UPYUN_SECRET;

var thunkify = require('thunkify');

module.exports = function (app) {

  app.upyun = new UpYun(bucket, username, password, 'v0.api.upyun.com', {
    apiVersion: 'v2',
    secret: secret
  });

  app.upyun.putFile = thunkify(app.upyun.putFile);

}
