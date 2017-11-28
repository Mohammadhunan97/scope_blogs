// http://localhost:3000/post/<Route>
const Router 	 	 = require('express').Router(),
	Post 			 = require('../model/post.model');


Router.get('/new',(req,res) => {
	res.render('new_post');
})

Router.post('/new',(req,res) => {
	let newpost = new Post;
	newpost.title = req.body.title;
	newpost.description = req.body.description;
	newpost.image = req.body.image;
	newpost.original_poster = req.user || req.session.user;
	newpost.tags = ['bar','baz'];
	newpost.lastupdated = Date.now();
	newpost.save((err,post) => {
		if(err){
			console.log(err);
		}else{
			console.log(post);
		}
	})
})



Router.get('/dashboard', (req,res) => {
	Post.find({ original_poster: req.session.user }).populate('original_poster','username').then((posts) =>{
	    // res.send(JSON.stringify(posts));

	    posts.forEach((post) => {
	    	console.log('the following post was made by: ' + post.original_poster.username);
	    	console.log(JSON.stringify(post));
	    	console.log('\n');
	    })
	}) //where req.session.user is an id (the logged in user's object id or _id)
})

module.exports = Router;



