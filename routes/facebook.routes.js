const Router 	 	 = require('express').Router(),
	passport 	  	 = require('passport');

require('../authentication/facebook.passport.js');


Router.get('/', passport.authenticate('facebook',{
	scope: ['public_profile']
}));
Router.get('/redirect',passport.authenticate('facebook'),(req,res) => {
	res.redirect('/user/one/'+req.user._id);
})



module.exports = Router;
