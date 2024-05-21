import axios from 'axios';

// Create an instance with a base URL for your API
export const apiInstance = axios.create({
  baseURL: 'https://your-api.com/api',
  timeout: 5000, // optional, sets the request timeout to 5 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

// Create another instance with a different base URL if needed
export const anotherInstance = axios.create({
  baseURL: 'https://another-api.com',
  // Add any other configuration options here
});