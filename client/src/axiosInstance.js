import axios from 'axios';

// Create an instance of axios with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this URL to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the axios instance
export default axiosInstance;
