//importing mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema
//defining schemas for saving in db
const TodoSchema = new mongoose.Schema({
  task: { type: String, require: true },
  done: {
    type: Boolean,
    default: false
  },
  UserId: { type: Schema.Types.ObjectId, ref: "users", require: true }
});

//difing the created schema into a variable
const TodoModel = mongoose.model("todos", TodoSchema);

//exporting the model
module.exports = TodoModel;
