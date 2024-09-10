import React, { useState, useEffect } from 'react';
import passwordImage from '../../../../assets/Pictures/password.png';
import './ResetPassword.css';
import playerService from '../../../../services/PlayerService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenParam = queryParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            console.error("Pas de Token dans l'URL");
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await playerService.resetPassword(token, newPassword, confirmPassword);
            toast.success('Votre mot de passe a été réinitialisé avec succès.', {
                position: "top-right",
                autoClose: 5000,
            });
            setTimeout(() => {
                navigate('/auth');
            }, 1500);
        } catch (err) {
            toast.error('Une erreur est survenue lors de la réinitialisation du mot de passe.', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="password-container">
            <div className="reset-password-content">
                <div className="password-image">
                    <img src={passwordImage} alt="password" />
                </div>
                <h2>Réinitialiser votre Mot de Passe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="password-input">
                        <input 
                            className="input" 
                            type="password" 
                            placeholder="Nouveau Mot de Passe" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input 
                            className="input" 
                            type="password" 
                            placeholder="Confirmer Mot de Passe" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="save-button" type="submit">Sauvegarder</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
