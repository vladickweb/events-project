const { Schema, model } = require("mongoose");

const userSchema = new Schema({

  googleId: {
    type: String
  },
 
  name: {
    type: String
  },
  
  email: {
    type: String,
    unique: true,
    match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/
  },
  
  password: {
    type: String,
  },
 
  rol: {
    type: String,
    enum: ['admin', 'company', 'client', 'unknown'],
    default: 'unknown'
  },
  
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
 
  likedEvents: {
    type: [Schema.Types.ObjectId],
    ref: 'Event'
  }

}, {timestamps: true});

const User = model("User", userSchema)

module.exports = User