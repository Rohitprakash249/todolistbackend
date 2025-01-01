const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A User must have a name"],
  },
  email: {
    type: String,
    required: [true, "A User must have a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A User must have a password"],
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
