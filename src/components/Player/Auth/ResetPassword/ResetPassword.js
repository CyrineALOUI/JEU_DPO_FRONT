import React, { useState, useEffect } from 'react';
import passwordImage from '../../../../assets/Pictures/password.png';
import './ResetPassword.css';
import playerService from '../../../../services/PlayerService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(null);
    const [error] = useState('');
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
            toast.error('Les mots de passe ne correspondent pas.', {
                position: "top-right",
                autoClose: 5000,
            });
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

    const evaluateStrength = async (password) => {
        try {
            const strength = await playerService.evaluatePasswordStrength(password);
            const strengthDisplay = {
                'tres-faible': 'Très faible',
                'faible': 'Faible',
                'moyen': 'Moyen',
                'fort': 'Fort',
                'tres-fort': 'Très fort',
            };
            setPasswordStrength({
                display: strengthDisplay[strength] || strength, // Version Accents
                className: strength // Version sans Accents
            });
        } catch (err) {
            console.error('Erreur lors de l\'évaluation de la force du mot de passe:', err);
        }
    };

    const toggleShowNewPassword = () => setShowNewPassword(prev => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    return (
        <div className="password-container">
            <div className="reset-password-content">
                <div className="password-image">
                    <img src={passwordImage} alt="password" />
                </div>
                <h2>Réinitialiser votre Mot de Passe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="password-input">
                        <div className="input-wrapper">
                            <input
                                className="input"
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Nouveau Mot de Passe"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    evaluateStrength(e.target.value);
                                  }}
                                required
                            />
                            <span className="eye-icon" onClick={toggleShowNewPassword}>
                                <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                            </span>
                        </div>
                        {newPassword && (
                            <>
                                <div className={`password-strength-bar-settings ${passwordStrength?.className}`}>
                                    <div className="password-strength-progress-settings"></div>
                                </div>
                                <p className="password-strength-label-reset">Mot de Passe : {passwordStrength?.display}</p>
                            </>
                        )}

                        <div className="input-wrapper">
                            <input
                                className="input"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirmer Mot de Passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span className="eye-icon" onClick={toggleShowConfirmPassword}>
                                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button className="reset-password-button" type="submit">Sauvegarder</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
