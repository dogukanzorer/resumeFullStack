const mongoose = require("mongoose");
const express = require("express");
const {v4:uuiidv4} = require("uuid");
const app = express();
const cors = require("cors");
const axios = require("axios");
const Experience = require("./models/experience")
const connection = require("./database/db")
const User = require("./models/UserModel");
const createToken = require("./service/token.service");
const Working = require("./models/working");

app.use(express.json());
app.use(cors());


connection();


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

//register 
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Veritabanına kullanıcı ekle
        const user = new User({
            _id: uuidv4(),
            name: name,
            email: email,
            password: password,
            avatar: req.file // Bu satırda bir sorun olabilir, eğer formdata kullanıyorsanız req.file yerine req.body kullanmalısınız.
        });

        const result = await user.save();
        
        // Kullanıcıyı oluştur ve token oluştur
        const token = createToken();
        res.json({ token: token, user: result });
    } catch (error) {
        console.error("Server error:", error); // Hata ayrıntılarını loglayın
        res.status(500).json({ message: error.message });
    }
});
    
    //Login
    app.post("/api/login", async(req,res) => {
    
        try {
            const {email,password} = req.body;
            const user = await User.findOne({email:email,password: password});
            if(user == null){
                res.status(403).json({message:"Email address or password is incorrect"});
            }else {
                
                const token = createToken();
                res.json({token:token,user: user});
            }
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    })

    //Working get 
    app.get("/api/working", async (req,res) => {
        try{
            const working = await Working.find();
    
            res.json(working);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    })
    

app.listen(5000, () => console.log("Sunucu 5000 port uzerinden ayaga kalkti"));

