const Router = require('express').Router(),
	User = require('../model/user.model'),
	Post = require('../model/post.model');

Router.get('/',(req,res) => {

	if(req.session.user) {
		res.redirect('/user/profile/' + req.session.user);
	}else if(req.user){
		res.redirect('/user/profile/' + req.user._id);
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



