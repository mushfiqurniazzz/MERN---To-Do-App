//importing necessary libraries and functions
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DB_Server_Connection = require("./db/dbConn");
const app = express();

app.use(
cors({
  origin: "https://mern-to-do-app-client.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
    
})
);

app.use(express.json());
const router = require("./routes/routes");

//importing the declared routes
app.use("/", router);

//importing the database connection function and making the server listen if the database connection is successfull
DB_Server_Connection();

//make the app run on specefic port
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
