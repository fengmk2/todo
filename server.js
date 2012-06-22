/*!
 * todo - app.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

require('./lib/patch');
var connect = require('connect');
var render = require('connect-render');
var urlrouter = require('urlrouter');
var config = require('./config');
var todo = require('./controllers/todo');

var app = connect();

app.use('/public', connect.static(__dirname + '/public', {maxAge: 3600000 * 24 * 30}));
app.use(connect.cookieParser());
app.use(connect.query());
app.use(connect.bodyParser());
app.use(connect.session({secret: config.session_secret}));
app.use(connect.csrf());
app.use(render({
  root: __dirname + '/views',
  layout: 'layout.html',
  cache: config.debug, // `false` for debug
  helpers: {
    config: config,
    _csrf: function (req, res) {
      return req.session._csrf;
    }
  }
}));

/**
 * Routing
 */
var router = urlrouter(function (app) {
  app.get('/', todo.index);
  app.post('/todo/new', todo.new);
  app.get('/todo/:id', todo.view);
  app.get('/todo/:id/edit', todo.edit);
  app.post('/todo/:id/edit', todo.save);
  app.get('/todo/:id/delete', todo.delete);
  app.get('/todo/:id/finish', todo.finish);
});
app.use(router);

app.listen(config.port);
console.log('Server start on ' + config.port);