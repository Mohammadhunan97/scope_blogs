/* this file is for passportjs social media routes
	 all files in here go underneath yourorigin/auth/<route>
*/
const Router 	 	 = require('express').Router(),
	passport 	  	 = require('passport');

require('../authentication/google.passport.js');


Router.get('/', passport.authenticate('google',{
	scope: ['profile']
}));
Router.get('/redirect',passport.authenticate('google'),(req,res) => {
	res.redirect('/user/one/'+req.user._id);
})



module.exports = Router;