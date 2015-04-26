var jwt = require('jwt-simple');
var User = getmodule('models/usuario');

module.exports = function(req, res, next){
	var token = req.headers['x-access-token'];

	if (token) {
		try {
		   var decoded = jwt.decode(token, req.app.get('jwtTokenSecret'));
			if (decoded.exp <= Date.now()) {
 				return res.status(400).json({
 					message: 'Token inspirou, faça o login novamente'
 				});
			}else{
				User.findOne({_id: decoded.iss})
				.exec(function(err, user){
					if(err){
						return res.status(400).json({
 							message: 'Deu erro'
 						});		
					}

					if(!user){
						return res.status(400).json({
 							message: 'Usuário não encontrado'
 						});			
					}

					req.user = user;
					next();
				});
			}		 
		} catch (err) {
		   return res.status(400).json({
			 message: 'Não passou no catch'
		   })
		}
	} else {
		return res.status(400).json({
			message: 'Você não tem acesso'
		})	    
	}
}
