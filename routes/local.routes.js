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
	let errors = [];
	let passwordsMatch = req.body.password === req.body.password2;
	let passwordNotEmpty = req.body.password.length > 0;
	let usernameNotEmpty = req.body.username.length > 0;
	let emailNotEmpty = req.body.email.length > 0;

	if(!passwordsMatch){ errors.push('password fields must match'); }
	if(!passwordNotEmpty){ errors.push('password field cannot be empty ')}
	if(!usernameNotEmpty){ errors.push('username field cannot be empty ')}
	if(!emailNotEmpty){ errors.push('email field cannot be empty ')}

	console.log(errors.length);

	if(errors.length > 0){
		res.render('signup',{errors: errors});
	}else{

		let newuser = new User;
		newuser.email = req.body.email;
		newuser.username = req.body.username;
		newuser.password = req.body.password;
		newuser.profile_pic = req.body.profile_pic;
		newuser.lastupdated = Date.now();

		newuser.save((err,user) => {
			if(err){ 
				let errors = [];
				errors.push('something went wrong');
				errors.push(JSON.stringify(err));

				res.render('signup', {errors,})
			}else{
				req.session.user = user._id;
				res.redirect('/');
			}
		})

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