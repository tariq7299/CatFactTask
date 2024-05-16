import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAlert } from './AlertProvider';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { alerts, addAlert } = useAlert();

  function getToken() {
    const testToken = Cookies.get('token');
    return testToken;
  }

  function getUserData() {
    return localStorage.getItem('userData');
  }

  // function checkIfAuthenticated() {
  //   const storedToken = Cookies.get('token');
  //   return storedToken ? true : false;
  // }

  // Function to check if the user is authenticated
  async function checkIfAuthenticated() {
    const token = Cookies.get('token');

    try {
      const response = await axios.get(
        'http://localhost:3000/api/isAuthenticated',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.isAuthenticated) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        addAlert('Unathorized access please log in first !!', 'danger');
        return false;
      } else {
        // Handle other errors (e.g., network issues)
        console.error('Error checking authentication:', error);
        return false;
      }
    }
  }

  async function logIn(loginData) {
    try {
      // TASK #1: Fetch data from an API
      // Use Axios
      // Handle errors
      const response = await axios.post(
        'http://localhost:3000/api/login',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const res = response.data;

      if (!res.userData) {
        throw new Error(res.message);
      }

      Cookies.set('token', res.token);
      localStorage.setItem('userData', res.userData.username);
      navigate('/');
    } catch (err) {
      addAlert('username/password is wrong ⛔', 'danger');
    }
  }

  function logOut() {
    localStorage.removeItem('userData');
    Cookies.remove('token');
    navigate('/login');
  }

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
