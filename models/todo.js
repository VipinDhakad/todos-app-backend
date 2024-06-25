// models/todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  formattedDate: {
    fullDate: { type: String },
    day: { type: String },
    hours: { type: String },
    minutes: { type: String },
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
