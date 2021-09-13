const {
    Schema,
    model
} = require("mongoose");


const eventSchema = new Schema({

    title: {
        type: String,
    },
    direction: {
        country: String,
        city: String,
        number: Number,
    },
    description: String,
    category: {
        type: String,
        enum: ['music', 'Deporte', 'Laboral', 'Culinario', 'Otro'],
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    price: Number,
    image: String,
    isAccepted: Boolean,
    owner: Schema.Types.ObjectId
}, {
    timestamps: true
})

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema);

module.exports = Event;