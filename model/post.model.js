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
	}
})



module.exports = mongoose.model('Post',PostSchema);