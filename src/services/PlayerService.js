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
        if (error.response) {
            throw new Error(error.response.data || 'An error occurred');
        } else {
            throw new Error('Network error');
        }
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
    const response = await axios.post(`${apiUrl}/evaluatePasswordStrength`, { password });
    return response.data;
};

/* FORGOT PASSWORD */
const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${apiUrl}/forgotPassword`, { email });
        return response.data;
    } catch (error) {
        console.error('Forgot password error:', error);
        throw error;
    }
};

/* RESET PASSWORD */
const resetPassword = async (token, newPassword, confirmPassword) => {
    try {
        const response = await axios.post(`${apiUrl}/resetPassword?token=${token}`, { newPassword, confirmPassword });
        return response.data;
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
};

/* DELETE ACCOUNT */
const deletePlayerAccount = async (email, password) => {
    try {
        const response = await instance.delete(`${apiUrl}/deletePlayerAccount`, { params: { password } });
        return response.data;
    } catch (error) {
        console.error('Delete account failed:', error);
        throw error;
    }
};

/* DEACTIVATE PLAYER ACCOUNT */
const deactivateAccount = async () => {
    try {
        const response = await instance.put(`${apiUrl}/deactivateAccount`);
        return response.data;
    } catch (error) {
        console.error('Failed to deactivate account:', error);
        throw error;
    }
};

/* SEND REACTIVATION EMAIL */
const sendReactivationEmail = async (email) => {
    try {
        const response = await axios.post(`${apiUrl}/sendReactivationEmail`, { email });
        return response.data;
    } catch (error) {
        console.error('Failed to send reactivation email:', error);
        throw error;
    }
};

/* VERIFY REACTIVATION CODE */
const reactivateAccount = async (verificationCode) => {
    try {
        const response = await axios.post(`${apiUrl}/reactivateAccount`, null, { params: { verificationCode } });
        return response.data;
    } catch (error) {
        console.error('Reactivation failed:', error);
        throw error;
    }
};

/* RECOVER LIFE */
const recoverLife = async () => {
    try {
        const response = await instance.post(`${apiUrl}/recoverLife`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            console.error('Failed to recover life:', error);
            throw error;
        }
    }
};

/* UNLOCK NEXT LEVEL */
const unlockNextLevel = async (currentLevelNumber) => {
    try {
        const response = await instance.post(`${apiUrl}/unlockNextLevel`, null, { params: { currentLevelNumber } });
        return response.data;
    } catch (error) {
        console.error('Error unlocking the next level:', error);
        throw error;
    }
};


/* LOSE LIFE */
const loseLife = async () => {
    try {
        const response = await instance.put(`${apiUrl}/loseLife`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            console.error('Failed to lose life:', error);
            throw error;
        }
    }
};

/* BUY LIVES */
const buyLives = async () => {
    try {
        const response = await instance.post(`${apiUrl}/buyLives`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            console.error('Failed to buy lives:', error);
            throw error;
        }
    }
};

/* LEADERBOARD */
const getLeaderboard = async () => {
    const response = await instance.get(`${apiUrl}/leaderBoard`);
    return response.data; 
};

const playerService = {
    login,
    register,
    updateProfile,
    getPlayerData,
    changePassword,
    evaluatePasswordStrength,
    forgotPassword,
    resetPassword,
    deletePlayerAccount,
    deactivateAccount,
    sendReactivationEmail,
    reactivateAccount,
    unlockNextLevel,
    recoverLife,
    loseLife,
    buyLives,
    getLeaderboard
};

export default playerService;


