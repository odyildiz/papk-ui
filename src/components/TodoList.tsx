import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  items: { id: number; text: string }[];
  onRefresh: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onRefresh }) => {
  return (
    <ul>
      {items.map((item) => (
        <TodoItem key={item.id} item={item} onRefresh={onRefresh} />
      ))}
    </ul>
  );
};

export default TodoList;
