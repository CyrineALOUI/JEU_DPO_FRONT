import { React, useState } from 'react';
import './Auth.css';
import playerService from '../../../services/PlayerService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = ({ toggleForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await playerService.register(firstName, lastName, email, password);
      toast.success('Compte créé avec succès !', {
        position: "top-right",
        autoClose: 5000,
      });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        toggleForm();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError('Cette adresse mail est déjà utilisée');
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      evaluateStrength(newPassword);
    } else {
      setPasswordStrength(null);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="Form" onSubmit={handleRegister}>
      <h2>Créer Un Compte</h2>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
      <div className="form-group-inline">
        <div className="FormGroup">
          <input
            type="text"
            className="Input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label className="Label">Nom</label>
        </div>
        <div className="FormGroup">
          <input
            type="text"
            className="Input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label className="Label">Prénom</label>
        </div>
      </div>

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

      <div className="FormGroup">
        <input
          type={showPassword ? 'text' : 'password'}
          className="Input"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <label className="Label">Mot de passe</label>
        <span onClick={toggleShowPassword} className="eye-icon">
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
      </div>
      {password && (
        <>
          <div className={`password-strength-bar ${passwordStrength?.className}`}>
            <div className="password-strength-progress"></div>
          </div>
          <p className="password-strength-label">Mot de Passe : {passwordStrength?.display}</p>
        </>
      )}
      <br />
      <br />
      <button className="form-button" type="submit">Créer Compte<span></span></button>
    </form>
  );
};

export default RegisterForm;
