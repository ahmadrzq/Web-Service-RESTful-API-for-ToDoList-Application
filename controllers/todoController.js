// todoController.js
const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Create a new todo with user ID from token
        const newTodo = new Todo({ title, description, user: req.user.userId });
        await newTodo.save();

        res.status(201).json({ code: 201, message: 'Todo created successfully.', data: newTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error', data: null });
    }
};

const getAllTodos = async (req, res) => {
    try {
        // Get all todos for the user
        const todos = await Todo.find({ user: req.user.userId });

        res.status(200).json({ code: 200, message: 'Todos retrieved successfully.', data: todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error', data: null });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;

        // Get todo by ID
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ code: 404, message: 'Todo not found.', data: null });
        }

        res.status(200).json({ code: 200, message: 'Todo retrieved successfully.', data: todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error', data: null });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, description } = req.body;

        // Update todo by ID
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title, description }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ code: 404, message: 'Todo not found.', data: null });
        }

        res.status(200).json({ code: 200, message: 'Todo updated successfully.', data: updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error', data: null });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        // Delete todo by ID
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ code: 404, message: 'Todo not found.', data: null });
        }

        res.status(200).json({ code: 200, message: 'Todo deleted successfully.', data: deletedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error', data: null });
    }
};

const deleteAllTodos = async (req, res) => {
    try {
        // Delete all todos
        const deletedTodos = await Todo.deleteMany({});

        res.status(200).json({ code: 200, message: 'All todos deleted successfully.', data: deletedTodos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error', data: null });
    }
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    deleteAllTodos,
};
