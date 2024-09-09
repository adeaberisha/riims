import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:7254/api';

// Set the default header
const token = localStorage.getItem('jwtToken');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors, e.g., redirect to login
            // Optionally clear the token here
            localStorage.removeItem('jwtToken');
        }
        return Promise.reject(error);
    }
);

export default axios;
