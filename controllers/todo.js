
var config = require('../config')
  , db = config.db;

exports.index = function(req, res) {
	db.query('select * from todo order by finished asc, id asc', function(err, rows) {
		if(err) return next(err);
		res.render('index', {todos: rows});
	});
};

exports.new = function(req, res, next) {
	var title = req.body.title || '';
	title = title.trim();
	if(!title) {
		return res.render('error', {message: '标题是必须的'});
	}
	db.query('insert into todo set title=?, post_date=now()', [title], function(err, result) {
		if(err) return next(err);
		res.redirect('/');
	});
};

exports.view = function(req, res, next) {
	res.redirect('/');
};

exports.edit = function(req, res, next) {
	var id = req.params.id;
	db.query('select * from todo where id=?', [id], function(err, rows) {
		if(err) return next(err);
		if(rows && rows.length > 0) {
			var row = rows[0];
			res.render('todo/edit', {todo: row});
		} else {
			next();
		}
	});
};

exports.save = function(req, res, next) {
	var id = req.params.id;
	var title = req.body.title || '';
	title = title.trim();
	if(!title) {
		return res.render('error', {message: '标题是必须的'});
	}
	db.query('update todo set title=? where id=?', [title, id], function(err, result) {
		if(err) return next(err);
		res.redirect('/');
	});
};

exports.delete = function(req, res, next) {
	var id = req.params.id;
	db.query('delete from todo where id = ?', [id], function(err) {
		if(err) return next(err);
		res.redirect('/');
	});
};

exports.finish = function(req, res, next) {
	var finished = req.query.status === 'yes' ? 1 : 0;
	var id = req.params.id;
	db.query('update todo set finished=? where id=?', [finished, id], function(err, result) {
		if(err) return next(err);
		res.redirect('/');
	});
};