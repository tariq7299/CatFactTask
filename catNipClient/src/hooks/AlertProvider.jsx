// src/AlertContext.js
import React, { createContext, useContext, useState} from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {

  const addAlert = (message, variant) => {
    console.log("message", message, "variant", variant)
    toast[variant](message)
  }

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

export const useAlert = () => {
  return useContext(AlertContext);
};
