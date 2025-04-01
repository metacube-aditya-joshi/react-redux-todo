import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../redux/slices/todoSlice";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [action, setAction] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const handleAddTodo = () => {
    setIsFormVisible(true);
    setAction('addTodo');
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, title, description) => {
    setIsFormVisible(true);
    setAction('updateTodo');
    setCurrentTodoId(id);
    setCurrentTitle(title);
    setCurrentDescription(description);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setAction('');
    setCurrentTodoId(null);
    setCurrentTitle('');
    setCurrentDescription('');
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleAddTodo}>
       Add Todo
      </button>

      {isFormVisible && (
        <TodoForm
          action={action}
          todoId={currentTodoId}
          existingTitle={currentTitle}
          existingDescription={currentDescription}
        />
      )}

      {isFormVisible && (
        <button onClick={handleCancelForm}>Cancel</button>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => handleUpdateTodo(todo.id, todo.title, todo.description)}>Update</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
