const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		users: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		message: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Message',
			},
		],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

const Group = mongoose.model('Group', groupSchema)

module.exports = Group
