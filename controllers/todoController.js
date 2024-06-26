// controllers/todoController.js
const Todo = require('../models/todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  const { title, completed, formattedDate } = req.body;

  const newTodo = new Todo({
    title,
    completed,
    formattedDate,
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed, formattedDate } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title;
    todo.completed = completed;
    todo.formattedDate = formattedDate;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Todo.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
