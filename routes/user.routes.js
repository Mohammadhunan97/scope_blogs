const Router 	 	 = require('express').Router();




Router.get('/one/:id',(req,res) => {

	if(req.isAuthenticated() && req.user._id == req.params.id) {
		res.render('profile',{user: req.user});
	}else if(req.session.localUser){
		res.render('profile',{user: req.session.localUser});
	}else{
		res.redirect('/');
	}
})

Router.get('/signout',(req,res)=> {
	if(req.session.localUser){
		req.session.destroy(function(err) {
			res.redirect = "/";
	    })
	}else if(req.isAuthenticated()){
		req.logout();
  	 	res.redirect("/"); //Can fire before session is destroyed?
	}else{
		res.redirect("/");
	}
})



module.exports = Router;