import express from 'express';
import { fetchTodos, deleteTodo, updateTodo, addTodo } from '../contoller/todos.contollers.js';  // Corrected path to controller

const router = express.Router();

// Define routes
router.get('/todos', fetchTodos);      // Get all todos
router.post('/todos', addTodo);        // Add a new todo
router.put('/todos/:id', updateTodo);   // Update a todo
router.delete('/todos/:id', deleteTodo); // Delete a todo

export { router }; // Export the router for use in the main app
