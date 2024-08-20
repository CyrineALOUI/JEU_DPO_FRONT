import axios from 'axios';
import apiUrl from '../configuration/config';

/* LOGIN PLAYER */
const login = async (email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, { email, password });
        if (response.data.jwt) {
            localStorage.setItem('token', response.data.jwt);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/* REGISTER PLAYER */
const register = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/register`, { firstName, lastName, email, password });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

/* UPDATE PROFILE */
const updateProfile = async (id, firstName, lastName, email) => {
    try {
        const response = await axios.put(`${apiUrl}/updateProfile/${id}`, {
            firstName,
            lastName,
            email
        });
        return response.data;
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};


const playerService = {
    login,
    register,
    updateProfile
};

export default playerService;


