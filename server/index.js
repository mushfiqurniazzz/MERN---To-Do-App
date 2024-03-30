const dotenv = require('dotenv');
dotenv.config(); const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const TodoModel = require('./Models/Todo')
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

app.post("/add", (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findOneAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

mongoose.connect(process.env.MONGODB_URI)

app.listen(process.env.PORT, () => {
    console.log(`Server Running`)
})