const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;