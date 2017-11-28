const Router = require('express').Router(),
	User = require('../model/user.model');

Router.get('/',(req,res) => {

	if(req.session.user) {
		User.findOne({_id: req.session.user }).exec((err,user) => {
			res.render('profile',{user,})
		})
	}else if(req.user){
		res.render('profile',{user: req.user})
	}else{
		res.render('login', {errors: []});
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