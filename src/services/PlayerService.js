import axios from 'axios';
import apiUrl from '../configuration/config';
import instance from '../configuration/interceptor';

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

/* GET CURRENT PLAYER */
const getPlayerData = async () => {
    try {
        const response = await instance.get(`${apiUrl}/getPlayerData`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch current player:', error);
        throw error;
    }
};

/* UPDATE PROFILE */
const updateProfile = async (firstName, lastName, email) => {
    try {
        const response = await instance.put(`${apiUrl}/updateProfile`, { firstName, lastName, email });
        return response.data;
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};


/* GET PLAYER BY ID*/
const getPlayerById = async (id) => {
    try {
        const response = await instance.get(`${apiUrl}/getPlayer/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch player:', error);
        throw error;
    }
};

/* CHANGE PASSWORD */
const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {
    try {
        const response = await instance.put(`${apiUrl}/changePassword`, { oldPassword, newPassword, confirmNewPassword });
        return response.data;
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
};

/* EVALUATE PASSWORD */
const evaluatePasswordStrength = async (password) => {
    try {
        const response = await axios.post(`${apiUrl}/evaluatePasswordStrength`, { password });
        return response.data;
    } catch (error) {
        console.error('Password strength evaluation error:', error);
        throw error;
    }
};

const playerService = {
    login,
    register,
    updateProfile,
    getPlayerById,
    getPlayerData,
    changePassword,
    evaluatePasswordStrength
};

export default playerService;


