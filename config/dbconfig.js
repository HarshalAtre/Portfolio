const mongoose = require('mongoose');
require('dotenv').config(); 
mongoose.connect(process.env.MONGO_URL)
const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose connected to DB");
})

connection.on("error", () => {
    console.log("Error connecting to DB");
})

module.exports = connection; 