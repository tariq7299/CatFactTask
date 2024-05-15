// src/AlertContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const location = useLocation();

  const addAlert = (message, variant) => {
    const id = uuidv4();
    setAlerts([...alerts, { id, message, variant }]);
  };

  const removeAlert = (idToRemove) => {
    setAlerts(alerts.filter((alert) => alert.id !== idToRemove));
  };

  useEffect(() => {
    setAlerts([]);
  }, [location]);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

export const useAlert = () => {
  return useContext(AlertContext);
};
