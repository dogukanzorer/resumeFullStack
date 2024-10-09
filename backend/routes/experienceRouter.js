const express = require("express");
const { v4: uuiidv4 } = require("uuid");
const app = express();
const router = express.Router(); 
const Experience = require("./models/experience");
const Working = require("./models/working")




//Experience post
app.post("/api/experience", async (req, res) => {
    try {
        const { name, content1, content2, content3 , description , url} = req.body;
        const experience = new Experience({
            _id: uuiidv4(),
            name: name,
            content1: content1,
            content2: content2,
            content3: content3,
            description:description,
            url:url

            
        });

        // Save the experience object to the database
        const savedExperience = await experience.save();

        // Send a successful response with the saved data
        res.json(savedExperience);
    } catch (error) {
        // Send an error response if there is an issue
        res.status(500).json({ message: error.message });
    }
});

//Experience get 
app.get("/api/experience", async (req, res) => {
    try {
        // Fetch all experiences from the MongoDB database
        const experiences = await Experience.find();

        // Send the fetched experiences as the response
        res.json(experiences);
    } catch (error) {
        // Send an error response if there is an issue
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/working", async (req,res) => {
    try{
        const working = await Working.find();

        res.json(working);
    }
    catch{
        res.status(500).json({error: error.message});
    }
})

module.exports = router;