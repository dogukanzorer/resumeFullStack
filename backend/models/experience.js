const mongoose = require("mongoose")

const projectExperienceSchema = new mongoose.Schema({
    _id:String,
    name:String,
    content1:String,
    content2:String,
    content3:String,
    description:String,
    url:String
})

const Experience = mongoose.model("Experience",projectExperienceSchema);

module.exports = Experience;