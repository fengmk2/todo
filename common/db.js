/*!
 * todo - common/db.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var mongoskin = require('mongoskin');
var config = require('../config');

var noop = function () {};

var db = mongoskin.db(config.db);
db.bind('todo');
db.todo.ensureIndex({ finished: 1 }, noop);

module.exports = db;