const mongoose = require("mongoose");
const { Schema } = mongoose;

/* The code is defining a Mongoose schema for a user object. The user schema has three fields: `chatid`
of type Number, `username` of type String, and `auth` of type String. */
const userSchema = new mongoose.Schema({
  chatid: Number,
  username: String,
  auth: String,
});
const User = mongoose.model("User", userSchema);
module.exports = { User };
