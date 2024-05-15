import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAlert } from './AlertProvider';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { alerts, addAlert } = useAlert();

  const getToken = () => {
    return Cookies.get('token');
  };

  const getUserData = () => {
    return localStorage.getItem('userData');
  };

  const checkIfAuthenticated = () => {
    const storedToken = Cookies.get('token');
    return storedToken ? true : false;
  };

  const logIn = async (loginData) => {
  try {
      // TASK #1 : Fetch data from an API
      // Use Axios
      // Handle errors
    const response = await axios.post('http://localhost:3000/api/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = response.data;

    if (!res.userData) {
      throw new Error(res.message);
    }

    Cookies.set('token', res.token, { expires: 7 });
    localStorage.setItem('userData', res.userData.username);
    navigate('/');
  } catch (err) {
    console.error(err);
    addAlert('username/password is wrong ⛔', 'danger');
  }
};

  const logOut = () => {
    localStorage.removeItem('userData');
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ getToken, checkIfAuthenticated, logIn, logOut, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
