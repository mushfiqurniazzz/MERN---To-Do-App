//importing the schema  and a library for performing secure operations with the database like delete, update, create and get todos
const TodoModel = require("../Models/Todo");
const UserModel = require("../Models/User");
const bcrypt = require("bcryptjs");
const token = require("../utils/jwt");
require("dotenv").config();

//this function adds todos to the database
async function addToDo(req, res) {
  const task = req.body.task;
  TodoModel.create({
    task: task
  })
    .then(result => res.json(result))
    .catch(err => res.json(err));
}

//this function deletes todos from the database
async function deleteToDo(req, res) {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err));
}

//this function gets all the todos stored in the database
async function getToDo(req, res) {
  TodoModel.find().then(result => res.json(result)).catch(err => res.json(err));
}

//this function updates todos stored in the database
async function updateToDo(req, res) {
  const { id } = req.params;
  const { done } = req.body; // Assuming the client sends the desired state of 'done'

  // Use a conditional expression to toggle the 'done' property based on the request body
  const update = { done: done };

  TodoModel.findOneAndUpdate({ _id: id }, update, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
}

//this function is a signup function
async function userSignup(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "Fill all the fields"
    });
  }
  try {
    const newUser = await UserModel.create({ email, password });
    res.json({ id: newUser.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//user login function that compares the saved hashed password and return tokens jwt or json web token to the client
async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Fill all the fields"
    });
  }

  try {
    let foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    bcrypt.compare(password, foundUser.password, async function(err, isMatch) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (isMatch) {
        try {
          token(); //using the created token function from utils jwt.js
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Passwords do not match" });
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

//function for creating user or logging in user using firebase gmail authentication
async function googleAuth(req, res) {
  //declaring email, password to be taken from the req.body
  const { email, password } = req.body;

  //if the fields dont exist or  are empty
  if (!email || email === "" || !password || password === "") {
    //basic error handling
    return res.status(400).send("Missing Data in Data Field or Bad Request");
  }
  try {
    //incase the user is already saved
    const UserExists = await UserModel.findOne({ email });
    if (UserExists) {
      //send the token if the user is verified by the fire base and is save in the db
      token();
      return res.status(200).send("User Login Successfull");
    }
    //else case starts here
    //generating a random password as the email will be verified by firebase and there wont be a neccessity of adding a password by the user instead we can complete that by generating a random password and saving it. NOTE : This password wont be used, just to keep the account safe in db we hash this random password
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    //saving it
    const newUser = new UserModel({
      email: req.body.email,
      password: generatedPassword
    });

    await newUser.save();
  } catch (error) {
    //basic error handling
    console.Error("Error during googleAuth function", error);
    res.status(500).send("Error during googleAuth function");
  }
}

//exports the async functions
module.exports = {
  addToDo,
  deleteToDo,
  getToDo,
  updateToDo,
  userSignup,
  userLogin,
  googleAuth
};
