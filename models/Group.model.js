const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    title: {
        type: String,
        required: True
    },
    users: [{                              
        type: Schema.Types.ObjectId,
        ref: 'User'                      
    }],
    Message: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }
}, {
    timestamps: true
})

const Group = mongoose.model("Group", groupSchema);

module.exports = Group