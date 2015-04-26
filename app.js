require('getmodule');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('jwtTokenSecret', 'listadecomprasmotherfuck');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use(function(req, res, next) {
    req.app = app;
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Essa rota não existe');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

mongoose.connect('localhost:27017/compras');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao DB!!!'));
db.once('open', function callback () {console.log('Conectado ao mongodb.');});

module.exports = app;
