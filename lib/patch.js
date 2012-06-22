/*!
 * todo - lib/patch.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var http = require('http');

if (typeof http.ServerResponse.prototype.redirect === 'undefined') {
  http.ServerResponse.prototype.redirect = function (url, status) {
    this.writeHead(status || 302, {
      Location: url
    });
    this.end();
  };
}
