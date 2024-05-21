import axios from 'axios';
import Cookies from 'js-cookie';

  const token = Cookies.get('token')

    // we can also check if cookies in null and throw an error with status 401 and message unauthorized
    // But it is unneccessary actually because we send isAuthenticated request to api !    

// Create an instance with a base URL for your API
export const usersCatApiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Create an instance with a base URL for your API
export const internetCatApiInstance = axios.create({
    baseURL: 'https://catfact.ninja/facts',
  });

