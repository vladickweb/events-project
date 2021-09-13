const {
    Schema,
    model
} = require("mongoose");


const EventSchema = new Schema({

    title: {
        type: String,
    },
    direction: {
        Country: String,
        City: String,
        Number: Number,
    },
    description: String,
    category: {
        type: String,
        enum: ['Musica', 'Deporte', 'Laboral', 'Culinario', 'Otro'],
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

const Event = model("Event", EventSchema);

module.exports = Event;