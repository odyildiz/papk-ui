import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { getItems } from './services/api';
import './App.css';
import { AlertProvider } from './context/AlertContext';

interface Item {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems();
      setItems(fetchedItems);
    };
    fetchItems();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <AlertProvider>
      <div className="App">
        <h1>Todo App</h1>
        <AddTodoForm onRefresh={handleRefresh} />
        <TodoList items={items} onRefresh={handleRefresh} />
      </div>
    </AlertProvider>
  );
};

export default App;