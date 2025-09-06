
import axios from 'axios';

const API_URL = import.meta.env.BASE_API_URL || 'http://localhost:3001/items';

interface AlertFunction {
  (message: string, type: 'success' | 'error'): void;
}

export const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const addItem = async (item: { text: string }, showAlert: AlertFunction) => {
  try {
    const response = await axios.post(API_URL, item);
    showAlert('Item added successfully!', 'success');
    return response.data;
  } catch (error) {
    showAlert('Failed to add item.', 'error');
    console.error('Error adding item:', error);
    throw error;
  }
};

export const updateItem = async (id: number, item: { text: string }, showAlert: AlertFunction) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, item);
    showAlert('Item updated successfully!', 'success');
    return response.data;
  } catch (error) {
    showAlert('Failed to update item.', 'error');
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItem = async (id: number, showAlert: AlertFunction) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    showAlert('Item deleted successfully!', 'success');
    return response.data;
  } catch (error) {
    showAlert('Failed to delete item.', 'error');
    console.error('Error deleting item:', error);
    throw error;
  }
};
