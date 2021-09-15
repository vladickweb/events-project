const {Schema, model} = require('mongoose')

const messageSchema = new Schema(
	{
		name: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		body: {
			type: String,
			required: true,
		},
		groupOwner: {
			type: Schema.Types.ObjectId,
			ref: 'Group',
		},
	},
	{timestamps: true}
)

const Message = model('Message', messageSchema)

module.exports = Message
