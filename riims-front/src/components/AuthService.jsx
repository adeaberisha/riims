import axios from 'axios';

export const login = async (credentials) => {
    try {
        const response = await axios.post('https://localhost:7254/api/Auth/Login', credentials);
        console.log('API response:', response.data); 
        const { jwtToken } = response.data;  
        localStorage.setItem('jwtToken', jwtToken);
        return jwtToken;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};


