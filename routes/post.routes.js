// http://localhost:3000/post/<Route>
const Router 	 	 = require('express').Router(),
	Post 			 = require('../model/post.model'),
	User 			 = require('../model/user.model');


Router.get('/new',(req,res) => {
	res.render('new_post');
})

Router.post('/new',(req,res) => {
	let errors = [];
	let newpost = new Post;
	newpost.title = req.body.title;
	newpost.description = req.body.description;
	newpost.image = req.body.image;
	newpost.original_poster = req.user || req.session.user;
	newpost.tags = ['bar','baz'];
	newpost.lastupdated = Date.now();
	newpost.save((err,post) => {
		if(err){
			errors.push('could not create post');
			res.render('errorpage',{errors,});
		}else{
			res.redirect('/post/dashboard');
		}
	})
})


Router.get('/dashboard',(req,res) => {
	User.findOne({ _id: req.session.user}).then((user) => {
		user.followers.forEach((follower) => {

			Post.find({ original_poster: follower }).populate('original_poster', ['username']).then((posts) => {
				res.render('dashboard', {posts,});
			})
		})
	})

})

Router.get('/search/',(req,res) => {
	res.render('search', {posts: []});
})

Router.get('/search/:tag',(req,res) => {
	Post.find({tags: req.params.tag}).populate('original_poster', ['username']).then((posts) => {
		res.render('search', {posts,});
	})
})

module.exports = Router;





// .populate('original_poster.username')