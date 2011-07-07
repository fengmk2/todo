
var express = require('express')
  , ejs = require('ejs')
  , config = require('./config')
  , todo = require('./controllers/todo');

var app = express.createServer();
app.use(express.static(__dirname + '/public', {maxAge: 3600000 * 24 * 30}));
app.use(express.cookieParser());
app.use(express.bodyParser());

app.helpers({
	config: config
});

/**
 * Views settings
 */
app.set("view engine", "html");
app.set("views", __dirname + '/views');
app.register("html", ejs);

/**
 * Routing
 */
app.get('/', todo.index);
app.post('/todo/new', todo.new);
app.get('/todo/:id', todo.view);
app.get('/todo/:id/edit', todo.edit);
app.post('/todo/:id/edit', todo.save);
app.get('/todo/:id/delete', todo.delete);
app.get('/todo/:id/finish', todo.finish);

app.listen(config.port);
console.log('Server start http://localhost:' + config.port);