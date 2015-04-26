var Model = getmodule('models/compra');
//553bee810e97e97536536fad
exports.read = function(req, res){
	var user = req.user;
	console.log(user);
	Model.find({usuario: user.id})
	.exec(function(err, listas){
		if(err){
			return res.status(400).json({
				message: 'Deu merda!'
			});
		}

		return res.status(200).json(listas);
	});
}

exports.create = function(req, res){
	var lista = req.body;
	lista.usuario = '553bee810e97e97536536fad';
	lista.itens = [];

	var listaNew = new Model(lista);
	listaNew.save(function(err){
		if(err){
			return res.status(400).json({
				message: 'Deu merda!'
			});
		}

		return res.status(200).json(listaNew);
	});	
}

exports.update = function(req, res){
	var lista = req.body;
	lista.id = req.params.id;
	lista.usuario = '553bee810e97e97536536fad';

	Model.findOneAndUpdate({_id: lista.id},lista, null)
	.exec(function(err, result){
		if(err){
			return res.status(400).json({
				message: 'Deu merda!'
			});
		}

		return res.status(200).json(result);
	});
}

exports.profile = function(req, res){
	var id = req.params.id;

	Model.findOne({_id: id})
	.exec(function(err, lista){
		if(err){
			return res.status(400).json({
				message: 'Deu merda!'
			});
		}


		if(!lista){
			return res.status(404).json({
				message: 'Lista não encontrada'
			});	
		}

		return res.status(200).json(lista);
	});
}

exports.delete = function(req, res){
	var id = req.params.id;

	Model.remove({_id: id})
	.exec(function(err, lista){
		if(err){
			return res.status(400).json({
				message: 'Deu merda!'
			});
		}

		return res.status(200).json(lista);
	});
}