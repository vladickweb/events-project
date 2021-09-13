const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    title: String,
    users: [{                              
        type: Schema.Types.ObjectId,
        ref: 'User'                      
    }],
}, {
    timestamps: true
})

const Group = mongoose.model("Group", groupSchema);

module.exports = Group