const mongoose = require("mongoose");

//MongoDb email matson.honour@floodouts.com
//Mongo Db şifre Amnezia123--

const uri =
  "mongodb+srv://guiltyy98:2508@cluster0.4zzjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connection = () => {
  mongoose
    .connect(uri, {})
    .then(() => console.log("mongoDb connected"))
    .catch((err) => console.log("err:" + err.message));
};

module.exports = connection;
