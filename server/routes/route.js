//imports the necessary libraries, schemas and functions
const express = require("express")
const router = express.Router()
const {addToDo, deleteToDo, getToDo, updateToDo} = require('../controllers/controller.js');

//the http methods defined with controllers
router.post("/add", addToDo)
router.delete("/delete/:id", deleteToDo)
router.get("/get", getToDo)
router.put("/update/:id", updateToDo)

module.exports = router;