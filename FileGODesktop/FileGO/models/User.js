const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema({
  emailID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define User model
const User = mongoose.model("User", userSchema);

module.exports = User;
