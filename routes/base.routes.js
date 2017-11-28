const Router = require('express').Router();

Router.get('/',(req,res) => {

	if(req.session.user || req.user) {
		res.render('profile');
	}else {
		res.render('login');
	}

})


Router.get('/signup/',(req,res) => {
	let errors = [];
	if(req.session.user || req.user) {
		res.redirect('/');
	}else {
		res.render('signup',{errors: errors});
	}

})



module.exports = Router;