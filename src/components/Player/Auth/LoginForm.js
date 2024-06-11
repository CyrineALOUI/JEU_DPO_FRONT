import { React, useState } from 'react';
import './Auth.css';
import PlayerService from '../../../services/PlayerService';
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const LoginForm = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await PlayerService.login(email, password);
            console.log('JWT:', data.jwt);
            console.log("login success");
            //window.location.href = '/map';
        } catch (err) {
            console.error(err);
            setError('Email ou mot de passe invalide');
        }
    };

    return (
        <form className="Form" onSubmit={handleLogin}>
            <h2>Se Connecter</h2>
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br />
            <div className="FormGroup">
                <input
                    type="email"
                    className="Input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="Label">Email</label>
                <div className="Icon">
                    <BsFillEnvelopeFill />
                </div>
            </div>
            <br />
            <div className="FormGroup">
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="Input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label className="Label">Mot de passe</label>
                <div className="Icon" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </div>
            </div>
            <br />
            <button className="Button" type="submit">Se Connecter</button>
            <br />
            <br />
            <a href="#" className="ForgotPassword">Mot de passe oublié?</a>
        </form>
    );
};

export default LoginForm;
