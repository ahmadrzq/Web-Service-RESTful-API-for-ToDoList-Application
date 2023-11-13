// todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/todoController');
const authMiddleware = require('../../middleware/authMiddleware');

// Define Todo-related routes with authentication middleware

// Create a new Todo (POST /)
router.post('/', authMiddleware.authenticateToken, todoController.createTodo);

// Get all Todos (GET /)
router.get('/', authMiddleware.authenticateToken, todoController.getAllTodos);

// Get a specific Todo by ID (GET /:id)
router.get('/:id', authMiddleware.authenticateToken, todoController.getTodoById);

// Update a Todo by ID (PUT /:id)
router.put('/:id', authMiddleware.authenticateToken, todoController.updateTodo);

// Delete a Todo by ID (DELETE /:id)
router.delete('/:id', authMiddleware.authenticateToken, todoController.deleteTodo);

// Delete all Todos (DELETE /)
router.delete('/', authMiddleware.authenticateToken, todoController.deleteAllTodos);

module.exports = router;
