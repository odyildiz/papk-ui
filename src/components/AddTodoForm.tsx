import React, { useState } from 'react';
import { addItem } from '../services/api';
import { useAlert } from '../context/AlertContext';

interface AddTodoFormProps {
  onRefresh: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onRefresh }) => {
  const [text, setText] = useState('');
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await addItem({ text }, showAlert);
      setText('');
      onRefresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new item"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
