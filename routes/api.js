var express = require('express');
var App = express.Router();
var Usuario = getmodule('api/usuario');
var Compras = getmodule('api/compra');
var token = getmodule('token');

App.route('/signin')
		.post(Usuario.signin);

App.route('/signup')
		.post(Usuario.signup);

App.route('/listas')
		.get(token, Compras.read)
		.post(token, Compras.create)

App.route('/lista/:id')
		.get(token, Compras.profile)
		.put(token, Compras.update)
		.delete(token, Compras.delete)


module.exports = App;