import { useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAlert } from './AlertProvider';
import axios from 'axios';
import { usersCatApiInstance } from '../helper/axiosInstances';
import errorHandler from '../helper/helperFunctions';

const AuthContext = createContext();

// This will provide authenticatio for the whole app compoenents using Context API
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  function getToken() {
    const testToken = Cookies.get('token');
    return testToken;
  }

  function getUserData() {
    return localStorage.getItem('userData');
  }

  // Function to check if the user is authenticated
  // I could check the cookies for the stored token without sending a request to server !, but i can't !! because the backend is like a mock api without a real database !
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

  // This will log the user in
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
    } catch (error) {
      errorHandler(error, addAlert, navigate)
    }
  }

  // THis will handle when user presses on "Exit" button
  async function logOut() {
    try {
      // TASK #1: Fetch data from an API
      // Use Axios
      // Handle errors
      const response = await usersCatApiInstance.post(
        '/logout'
      );

      if (response.status === 200 || response.status === 204) {
        console.log("response", response)
        addAlert(response.data.message);
        localStorage.removeItem('userData');
        Cookies.remove('token');
        navigate('/login');
      }

    } catch (error) {
      errorHandler(error, addAlert, navigate)
    }

 
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
