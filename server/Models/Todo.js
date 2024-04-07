//importing mongoose
const mongoose = require('mongoose')

//defining schemas for saving in db
const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
}})

//difing the created schema into a variable
const TodoModel = mongoose.model("todos", TodoSchema)

//exporting the model
module.exports = TodoModel