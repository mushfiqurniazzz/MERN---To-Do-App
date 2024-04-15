//importing the mongoose library
const mongoose = require("mongoose")
require("dotenv").config()
const express = require("express")
const app = express()
//creating the database connection function
const DB_Server_Connection = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(
            console.log("Connected to DB"),
            //make the app run on specefic port 
            app.listen(process.env.PORT, () => {
                console.log(`Server running on http://localhost:${process.env.PORT}`)
            })
        )
    } catch (error) {
        console.log(error)
    }

}

//exports the database connection
module.exports = DB_Server_Connection