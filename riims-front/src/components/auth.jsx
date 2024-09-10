import jwtDecode from 'jwt-decode';

export const getToken = () => localStorage.getItem('jwtToken');

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp >= currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};

export const isAdmin = (token) => {
    if (!isTokenValid(token)) return false;
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.toLowerCase() === 'admin';
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};
