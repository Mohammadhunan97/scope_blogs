const mongoose = require('mongoose'), 
	Schema = mongoose.Schema;

let UserSchema = new Schema({
	facebookid: {
		type: String,
		default: null,
	},
	googleid: {
	    type: String,
	    default: null,
	},
	email: {
	    type: String,
	    required: true,
	    unique: true,
	},
	username: {
	    type: String,
	    required: true,
	    unique: true,
	},
	password: {
	    type: String,
	    default: null,
	},
	profile_pic: {
	    type: String,
	    default: '/img/profilepic.png',
	},
	following: {
	    type: [mongoose.Schema.Types.ObjectId],
	    ref: 'User',
	    default: [mongoose.Types.ObjectId(this._id),mongoose.Types.ObjectId('5a1dc82f3c8676261f2370d1')]
	},
	followers: {
	    type: [mongoose.Schema.Types.ObjectId],
	    ref: 'User',
	    default: [mongoose.Types.ObjectId(this._id),mongoose.Types.ObjectId('5a1dc82f3c8676261f2370d1')]
	},
	posts: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Post'
	},
	timecreated: {
		type: Date,
		required: true,
		default: Date.now()
	},
	lastupdated: {
		type: Date,
		required: true
	}
})


module.exports = mongoose.model('User',UserSchema);