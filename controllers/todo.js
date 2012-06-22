/*!
 * todo - controllers/todo.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var config = require('../config');
var db = require('../common/db');

exports.index = function (req, res, next) {
  db.todo.findItems({}, { sort: {_id: 1, finished: 1}}, function (err, rows) {
    if (err) {
      return next(err);
    }
    res.render('index.html', {todos: rows});
  });
};

exports.new = function (req, res, next) {
  var title = req.body.title || '';
  title = title.trim();
  if (!title) {
    return res.render('error.html', {message: '标题是必须的'});
  }
  db.todo.save({title: title, post_date: new Date()}, function (err, row) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.view = function (req, res, next) {
  res.redirect('/');
};

exports.edit = function (req, res, next) {
  var id = req.params.id;
  db.todo.findById(id, function (err, row) {
    if (err) {
      return next(err);
    }
    if (!row) {
      return next();
    }
    res.render('todo/edit.html', {todo: row});
  });
};

exports.save = function (req, res, next) {
  var id = req.params.id;
  var title = req.body.title || '';
  title = title.trim();
  if (!title) {
    return res.render('error.html', {message: '标题是必须的'});
  }
  db.todo.updateById(id, {$set: {title: title}}, function (err, result) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.delete = function (req, res, next) {
  var id = req.params.id;
  db.todo.removeById(id, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.finish = function (req, res, next) {
  var finished = req.query.status === 'yes' ? 1 : 0;
  var id = req.params.id;
  db.todo.updateById(id, {$set: {finished: finished}}, function (err, result) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};