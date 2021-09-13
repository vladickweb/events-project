const {
  Schema,
  model
} = require("mongoose");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  googleId: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String,
    match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/
  },
  password: String,
  rol: {
    type: String,
    enum: ['Admin', 'Company', 'User'],
    default: 'User'
  },
  friends: [Schema.Types.ObjectId],
  likedEvents: [Schema.Types.ObjectId]

}, {timestamps: true});

const User = model("User", userSchema)

module.exports = User