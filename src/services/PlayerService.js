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

export default {
    login
};




/*const registerPlayer = async (player) => {
    const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
    });

    if (!response.ok) {
        throw new Error("Email is already in use.");
    }

    return response.json();
};*/


