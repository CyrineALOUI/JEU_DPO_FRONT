import { React, useState } from 'react';
import './Auth.css';
import playerService from '../../../services/PlayerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await playerService.login(email, password);
            console.log('JWT:', data.jwt);
            window.location.href = '/play';
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error(err);
            setError('Email ou mot de passe invalide');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <form className="Form" onSubmit={handleLogin}>
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
            <div className="FormGroup">
                <div className="checkbox-wrapper-46">
                    <input type="checkbox" id="cbx-46" className="inp-cbx" />
                    <label htmlFor="cbx-46" className="cbx">
                        <span>
                            <svg viewBox="0 0 12 10" height="10px" width="12px">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg>
                        </span>
                        <span className="remember-me-text">Se souvenir de moi</span>
                    </label>
                </div>
            </div>
            <button type="submit"> Se Connecter <span></span></button>
            <br />
            <br />
            <a href="#" className="ForgotPassword">Mot de passe oublié?</a>
        </form>
    );
};

export default LoginForm;
