const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
	friend: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	roomId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Friend', friendSchema);
