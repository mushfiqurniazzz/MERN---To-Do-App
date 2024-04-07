//importing necessary libraries and functions
require('dotenv').config(); 
const express = require("express")
const cors = require("cors");
const DB_Connection  = require('./db/dbConn');
const app = express()
app.use(cors())
app.use(express.json())
const router = require("./routes/route")

//importing the database connection function
DB_Connection()

//importing the declared routes
app.use(router)

//make the app run on specefic port 
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})