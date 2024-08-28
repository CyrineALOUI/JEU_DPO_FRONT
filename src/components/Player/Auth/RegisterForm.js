import { React, useState } from 'react';
import './Auth.css';
import playerService from '../../../services/PlayerService';

const RegisterForm = ({ toggleForm }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const player = await playerService.register(firstName, lastName, email, password);
      console.log('Player registered:', player);
      //Clear data
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      toggleForm();
    } catch (err) {
      console.error(error);
      setError('Registration failed');
    }
  };

  return (
    <form className="Form" onSubmit={handleRegister}>
      <h2>Créer Un Compte</h2>
      <br />
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
          type="password"
          className="Input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="Label">Mot de passe</label>
      </div>
      <br />
      <button className="Button" type="submit"></button>
      <button type="submit">Créer Compte<span></span></button>
    </form>
  );
};

export default RegisterForm;




