import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../redux/slices/todoSlice';
import './modal.css';

const TodoForm = ({ action, todoId, existingTitle, existingDescription, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');

  useEffect(() => {
    if (action === 'updateTodo') {
      setTitle(existingTitle);
      setDescription(existingDescription);
    }
  }, [action, existingTitle, existingDescription]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) return;

    if (action === 'addTodo') {
      dispatch(addTodo({ title, description, completed: false }));
    } else if (action === 'updateTodo') {
      const updatedTodo = { title, description, completed: true };
      dispatch(updateTodo({ id: todoId, updatedTodo }));
    }

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{action === 'updateTodo' ? 'Update Todo' : 'Add Todo'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button className="modal-button submit" type="submit">
            {action === 'updateTodo' ? 'Update Todo' : 'Add Todo'}
          </button>
        </form>
        <button className="modal-button cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TodoForm;
