const Router 	 	 = require('express').Router(),
	User 			 = require('../model/user.model'),
	Post 			 = require('../model/post.model');




Router.get('/profile/:id',(req,res) => {

	User.findOne({ _id: req.params.id}).then((user) => {
		Post.find({ original_poster: req.params.id }).then((posts) => {
			res.render('profile', {user, posts,});
		})
	})

})


Router.get('/settings',(req,res) => {
	// User.findOne({ _id: req.session.user}).populate('follower',['username']).then((user) => {
	// 	// console.log(user)
	// 	// Post.find({ original_poster: req.session.user }).then((posts) => {
	// 	// 	res.render('settings', {user, posts,});
	// 	// })
	// })

	User.findOne({ _id: req.session.user }).then((user) => {
		let followers = [], followings = [];

		User.find({_id: { $in: user.followers } }).then((results) =>{
			results.forEach((result) => {
				followers.push({
					_id: result._id,
					username: result.username
				})
			})
		}).then(()=> {
			User.find({_id: { $in: user.following } }).then((results) =>{

				results.forEach((result) => {
					followings.push({
						_id: result._id,
						username: result.username
					})
				})
				
			}).then(()=> {
				Post.find({ original_poster: req.session.user }).then((posts) => {
					
					console.log({
						user: user,
						posts: posts,
						followers: followers,
						followings: followings
					})
					res.render('settings',
					{
						user: user,
						posts: posts,
						followers: followers,
						followings: followings
					})
				})
			})
		});
		

		
	})
})

module.exports = Router;


