var Model = getmodule('models/usuario');
var moment = require('moment');
var jwt = require('jwt-simple');
exports.signup = function(req, res){
	var usuario = {
		nome: req.body.nome || "",
		email: req.body.email || "",
		password: req.body.password || "",
	};

	if(usuario.email == "" || usuario.nome == "" || usuario.password == ""){
		return res.status(404).json({
			message: 'Preencha os campos!'
		});
	}

	Model.findOne({email: usuario.email} )
	.exec(function(err, user){
		if(err){
			return res.status(400).json({
				message: 'Deu merda!'
		 	});
		}			

		if(user){
			return res.status(400).json({
				message: 'Email já está cadastrado'
			});			
		}

		var usuarioNew = new Model(usuario);

		usuarioNew.save(function(err){
			if(err){
				return res.status(400).json({
					message: 'Deu merda!'
				});
			}

			var expires = moment().add(7, 'days').calendar();
			var token = jwt.encode({
			  iss: usuarioNew.id,
			  exp: expires
			}, req.app.get('jwtTokenSecret'));
			 
			return res.json({
			  token : token,
			  expires: expires,
			  user: usuarioNew.toJSON()
			});				
		});
	});
}

exports.signin = function(req, res){
	var usuario = {
		email: req.body.email || "",
		password: req.body.password || "",
	};

	if(usuario.email == "" || usuario.password == ""){
		return res.status(404).json({
			message: 'Preencha os campos!'
		});
	}

	Model.findOne({email: usuario.email})
	.exec(function(err, user){
		if(err){
			return res.status(400).json({
				message: 'Deu merda!'
		 	});
		}

		if(!user){
			return res.status(404).json({
				message: 'Email não existe'
		 	});	
		}

		if(!user.validPassword(usuario.password)){
			return res.status(400).json({
				message: 'Senha incorreta'
		 	});		
		}

		user.password = null;

		var expires = moment().add(7, 'days').calendar();
		var token = jwt.encode({
		  iss: user.id,
		  exp: expires
		}, req.app.get('jwtTokenSecret'));
		 
		return res.json({
		  token : token,
		  expires: expires,
		  user: user.toJSON()
		});	
	});
}