// localhost:3000/auth/local/<Route>
const Router 	   = require('express').Router(),
	User		   = require('../model/user.model'),
	bcrypt 		   = require('bcryptjs'),
	salt 	 	   = bcrypt.genSaltSync(10);




Router.post('/login',(req,res)=>{
	User.find({username: req.body.username},(err,user)=>{
		if(user.length === 0 || bcrypt.compareSync(req.body.password, user[0].password) !== true){
			res.redirect("/");
		}else{
			req.session.localUser = user[0];
			res.redirect("/user/one/"+user[0]._id);
		}
	})
})

Router.post('/new',(req,res) => {
	if(req.body.password === req.body.password2){
		let newuser 		= new User;
		newuser.lastupdated = Date.now();
		newuser.username 	= req.body.username;
		newuser.password 	= bcrypt.hashSync(req.body.password,salt); 
		newuser.googleid 	= null;
		newuser.facebookid  = null;

		newuser.save((err, user) => {
			if(err){ 
				res.send(err);
			}else{
				req.session.localUser = user;
				res.redirect("/user/one/"+user._id);
			}		
		})
	}else{
		res.redirect("/"); // redirect with some message of incorrect login
	}
	
})


Router.put('/update/:id',(req,res) => {
	if(req.session.localUser && req.session.localUser._id === req.params.id) {
		User.findById(req.params.id,(err,user) => {
			if(!err) {
				newuser.lastupdated = Date.now();
				user.username = req.body.username || user.username;
				user.password = bcrypt.hashSync(req.body.password,salt) || user.password;

				user.save((err,user)=> {
					if(err){ 
						res.send(err);
					}else{
						req.session.localUser = user;
						res.redirect("/user/"+user._id);
					}	
				})
			}
		})
	}
})

Router.delete('/delete/:id',(req,res) => {
	if(req.session.localUser && req.session.localUser._id === req.params.id) {
		User.findByIdAndRemove(req.params.id,(err,user) => {
			if(err) res.send(err);
			res.send(user);
		})
	}
})

module.exports = Router;