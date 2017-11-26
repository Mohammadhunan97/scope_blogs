const Router = require('express').Router();

Router.get('/',(req,res) => {

	if(req.session.user || req.user) {
		res.render('profile');
	}else {
		res.render('login');
	}

})



module.exports = Router;