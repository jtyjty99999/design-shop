'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var UpYun = require('upyun');
var bucket = process.env.UPYUN_BUCKET || "pic-cloud-hn";
var username = process.env.UPYUN_USERNAME || "jtyjty99999"; 
var password = process.env.UPYUN_PASSWORD || "jty19880604";
var secret = process.env.UPYUN_SECRET || "9Tiuyq6o484zVgBXPem2qNd/0hM=";

var thunkify = require('thunkify');

module.exports = function (app) {
  console.log(bucket, username, password);

  app.upyun = new UpYun(bucket, username, password, 'v0.api.upyun.com', {
    apiVersion: 'v2',
    secret: secret
  });

  app.upyun.putFile = thunkify(app.upyun.putFile);

}
