import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
// Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: apiUrl+'/api', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        localStorage.removeItem('token');
        window.location.href = '/auth';
    }
    return Promise.reject(error);
});

export default axiosInstance;
