const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String,
    workingYear: String,
});

const Working = mongoose.model("working", userSchema);

module.exports = Working;
