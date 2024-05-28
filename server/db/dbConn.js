//importing the mongoose library
const mongoose = require("mongoose");

//creating the database connection function
const DB_Server_Connection = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(console.log("Connected to DB"));
  } catch (error) {
    console.log(error);
  }
};

//exports the database connection
module.exports = DB_Server_Connection;
