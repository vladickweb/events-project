const {Schema, model} = require('mongoose')

const eventSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		direction: {
			country: {
				type: String,
				required: true,
			},

			city: {
				type: String,
				required: true,
			},

			number: {
				type: Number,
				required: true,
			},
		},

		description: {
			type: String,
			required: true,
		},

		category: {
			type: String,
			enum: ['music', 'sport', 'job', 'food', 'other'],
			required: true,
		},

		location: {
			type: {
				type: String,
			},
			coordinates: [Number],
		},

		price: Number,

		image: {
			type: String,

			required: true,
		},

		isAccepted: {
			type: Boolean,
			required: true,
			default: false,
		},

		owner: {
			type: Schema.Types.ObjectId,

			ref: 'User',
		},

		reserve: [{
			type: Schema.Types.ObjectId,
			ref: 'User',
		}],

		date: {
			
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
	}
)

eventSchema.index({
	location: '2dsphere',
})

const Event = model('Event', eventSchema)

module.exports = Event