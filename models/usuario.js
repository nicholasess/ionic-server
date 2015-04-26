var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = bcrypt.genSaltSync(8);
var Schema = mongoose.Schema({
	nome: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

Schema.pre('save', function(next) {
    var user = this;

    console.log(user.isModified('password'), user.isNew);

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR, null);
    
    next();
});

// checking if password is valid
Schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('usuario', Schema);