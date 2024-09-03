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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="Label">Mot de passe</label>
        <span onClick={toggleShowPassword} className="eye-icon">
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
      </div>
      <br />
      <button className="Button" type="submit"></button>
      <button type="submit">Créer Compte<span></span></button>
    </form>
  );
};

export default RegisterForm;