import axios from 'axios';
import Cookies from 'js-cookie';

  const token = Cookies.get('token')

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

