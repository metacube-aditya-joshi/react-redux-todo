import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../redux/slices/todoSlice";
import TodoForm from "./TodoForm";
import './modal.css';

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
    setCurrentTodoId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTodo(currentTodoId));
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleUpdateTodo = (id, title, description) => {
    setIsFormVisible(true);
    setAction('updateTodo');
    setCurrentTodoId(id);
    setCurrentTitle(title);
    setCurrentDescription(description);
  };

  const handleCloseForm = () => {
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
      <button className="add" onClick={handleAddTodo}>
        Add Todo
      </button>

      {isFormVisible && (
        <TodoForm
          action={action}
          todoId={currentTodoId}
          existingTitle={currentTitle}
          existingDescription={currentDescription}
          onClose={handleCloseForm}
        />
      )}

      {showDeleteConfirmation && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-content">
            <h3>Are you sure you want to delete this todo?</h3>
            <button className="modal-button cancel" onClick={cancelDelete}>Cancel</button>
            <button className="modal-button delete" onClick={confirmDelete}>Delete</button>
          </div>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <div>
            <button className="update" onClick={() => handleUpdateTodo(todo.id, todo.title, todo.description)}>Update</button>
            <button className="delete" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
