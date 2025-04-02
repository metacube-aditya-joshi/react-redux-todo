import { todos } from "../index.js"; // Corrected path to reference todos in server.js

const fetchTodos = (req, res) => {
  try {
    return res.status(200).json(todos);
  } catch (error) {
    res.status(401).json("Error: " + error.message);
  }
};

const addTodo = (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const newTodo = {
      id: todos.length + 1,
      title,
      description,
      completed: completed || false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(401).json("Error: " + error.message);// 500 server error
  }
};

const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = todos.find((todo) => todo.id === parseInt(id));

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;

    res.status(200).json(todo);
  } catch (error) {
    res.status(401).json("Error: " + error.message);
  }
};

const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const index = todos.findIndex((todo) => todo.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(index, 1); // Remove the todo from the array
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(401).json("Error: " + error.message);
  }
};

export { fetchTodos, deleteTodo, updateTodo, addTodo };
