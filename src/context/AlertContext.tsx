import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Alert {
  message: string;
  type: 'success' | 'error';
  id: number;
}

interface AlertContextType {
  showAlert: (message: string, type: 'success' | 'error') => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setAlerts((prevAlerts) => [...prevAlerts, { message, type, id }]);
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    }, 5000); // Alerts disappear after 5 seconds
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} message={alert.message} type={alert.type} onClose={() => setAlerts((prevAlerts) => prevAlerts.filter((a) => a.id !== alert.id))} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

// Placeholder for AlertCard component - will be defined in src/components/AlertCard.tsx
interface AlertCardProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? '#4CAF50' : '#f44336';
  const textColor = 'white';

  return (
    <div style={{
      backgroundColor: bgColor,
      color: textColor,
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '250px',
      maxWidth: '350px',
      wordBreak: 'break-word',
    }}>
      <span>{message}</span>
      <button onClick={onClose} style={{
        background: 'none',
        border: 'none',
        color: textColor,
        fontSize: '1.2em',
        cursor: 'pointer',
        marginLeft: '10px',
      }}>
        &times;
      </button>
    </div>
  );
};
