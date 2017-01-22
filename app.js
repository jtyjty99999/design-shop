'use strict';

/**
 * Module dependencies.
 */

const path = require('path');
const fs = require('fs');

const baseDir = path.join(__dirname, '.');
const nodeModulesDir = path.join(baseDir, 'node_modules');
let startCluster = require('aliyun-egg').startCluster;;


const antxpath = path.join(baseDir, 'antx.properties');

startCluster({
  baseDir: baseDir,
  antxpath: fs.existsSync(antxpath) ? antxpath : null,
  port: 7001,
});