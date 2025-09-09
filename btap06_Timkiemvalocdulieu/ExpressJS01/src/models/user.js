const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

const User = mongoose.model("user", userSchema);

module.exports = User;
