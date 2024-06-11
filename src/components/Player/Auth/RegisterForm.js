import { React, useState } from 'react';
import './Auth.css';
import PlayerService from '../../../services/PlayerService';
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const RegisterForm = ({ toggleForm }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const player = await PlayerService.register(firstName, lastName, email, password);
      console.log('Player registered:', player);
      //Clear data
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      toggleForm();
    } catch (err) {
      console.error(err);
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
        <div className="Icon">
          <BsFillEnvelopeFill />
        </div>
      </div>

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
      <button className="Button" type="submit">Créer Un Compte</button>
    </form>
  );
};

export default RegisterForm;




