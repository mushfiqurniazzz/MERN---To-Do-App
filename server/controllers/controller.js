//importing the schema for performing operations with the database like delete, update, create and get todos
const TodoModel = require("../Models/Todo");

//this function adds todos to the database
async function addToDo(req, res) {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
}

//this function deletes todos from the database
async function deleteToDo(req, res) {
    const { id } = req.params
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

//this function gets all the todos stored in the database
async function getToDo(req, res) {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

//this function updates todos stored in the database
async function updateToDo(req, res) {
    const { id } = req.params;
    TodoModel.findOneAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

//exports the async functions
module.exports = {addToDo, deleteToDo, getToDo, updateToDo}