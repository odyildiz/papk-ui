import React, { useState } from 'react';
import { updateItem, deleteItem } from '../services/api';
import { useAlert } from '../context/AlertContext';

interface TodoItemProps {
  item: { id: number; text: string };
  onRefresh: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const { showAlert } = useAlert();

  const handleUpdate = async () => {
    await updateItem(item.id, { text }, showAlert);
    setIsEditing(false);
    onRefresh();
  };

  const handleDelete = async () => {
    await deleteItem(item.id, showAlert);
    onRefresh();
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span>{item.text}</span>
      )}
      {isEditing ? (
        <button onClick={handleUpdate}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
