const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    createdAt:{
        type:Date,
        default: Date.now
    },
    fullName: String,
    todoText:String
});

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;