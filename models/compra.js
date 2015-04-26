var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Schema = mongoose.Schema({
	titulo: String,
	obs: String,
	itens: [{
		descricao: String,
		qtd: Number
	}],
	usuario: {
		type: ObjectId,
		ref: 'usuario'
	}
});

module.exports = mongoose.model('lista', Schema);