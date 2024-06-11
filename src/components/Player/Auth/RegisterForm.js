import { React, useState } from 'react';
import './Auth.css';
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const RegisterForm = ({ toggleForm }) => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form className="Form" >
      <h2>Créer Un Compte</h2>
      <br />
      <br />
      <div className="form-group-inline">
        <div className="FormGroup">
          <input
            type="text"
            className="Input"
            required
          />
          <label className="Label">Nom</label>
        </div>
        <div className="FormGroup">
          <input
            type="text"
            className="Input"
            required
          />
          <label className="Label">Prénom</label>
        </div>
      </div>

      <div className="FormGroup">
        <input
          type="email"
          className="Input"
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




