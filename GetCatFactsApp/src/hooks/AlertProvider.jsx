// src/AlertContext.js
import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();


const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, variant) => {
    setAlerts([...alerts, { message, variant }]);
  };

  const removeAlert = (index) => {
    console.log("alerts", alerts)
    console.log("alerts__index", index)

    setAlerts(alerts.filter((_, i) => i !== index));
  };

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