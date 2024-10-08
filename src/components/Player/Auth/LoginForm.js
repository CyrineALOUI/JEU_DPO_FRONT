import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import playerService from '../../../services/PlayerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onForgotPasswordClick, onActivateAccountClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await playerService.login(email, password);
            console.log('JWT:', data.jwt);
            navigate('/play');
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error('Error details:', err);

            const errorMessage = err.message || 'An error occurred';

            if (errorMessage.includes('Player not found')) {
                setError('Joueur inexistant.');
            } else if (errorMessage.includes('Invalid email or password')) {
                setError('Email ou mot de passe invalide.');
            } else if (errorMessage.includes('Your account is deactivated')) {
                setError(
                    <>
                        Votre compte est désactivé.
                        <button type="button" className="activateButton" onClick={() => onActivateAccountClick(email)} >
                            Activez-le
                        </button>
                    </>
                );
            } else {
                setError('Une erreur est survenue. Veuillez réessayer.');
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div>
            <form className="Form" onSubmit={handleLogin}>
                <br />
                <br />
                <br />
                <h2>Se Connecter</h2>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <br />
                <div className="FormGroup">
                    <span className="Icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                        type="email"
                        className="Input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="Label">Email</label>
                </div>
                <br />
                <div className="FormGroup">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="Input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="Label">Mot de passe</label>
                    <span onClick={toggleShowPassword} className="eye-icon">
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </span>
                </div>
                <br />
                <button type="submit" className="form-button"> Se Connecter <span></span></button>
                <br />
                <button type="button" className="ForgotPassword" onClick={onForgotPasswordClick}>
                    Mot de passe oublié?
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
