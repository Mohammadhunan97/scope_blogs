const mongoose = require('mongoose'), 
	Schema = mongoose.Schema;

let PostSchema = new Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
	},
	original_poster: {  
		type: Schema.Types.ObjectId,
    	ref: 'User',
    	required: true
	},
	tags: {
		type: [String]
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



module.exports = mongoose.model('Post',PostSchema);