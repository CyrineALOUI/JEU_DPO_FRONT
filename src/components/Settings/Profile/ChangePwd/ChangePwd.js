import React, { useState } from 'react';
import './ChangePwd.css';
import playerService from '../../../../services/PlayerService';

const ChangePwd = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Nouveau mot de passe et confirmation ne correspondent pas');
      return;
    }

    try {
      await playerService.changePassword(oldPassword, newPassword, confirmNewPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setError('');
    } catch (error) {
      setError('Ancien Mot de passe incorrect');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="settings-body">
        <div className="settings-title">
          <h1>Changer Mot de Passe</h1>
          <div className="coolinput">

            <label className="text" htmlFor="oldPassword">Ancien Mot de Passe</label>    
            <input className="input" type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required/>

            <label className="text" htmlFor="newPassword">Nouveau Mot de Passe</label>
            <input className="input" type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>

            <label className="text" htmlFor="confirmNewPassword">Confirmer Mot de Passe</label>
            <input className="input" type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required/>

          </div>
          <button className="save-button" type="submit">Sauvegarder</button>
        </div>
      </div>
    </form>
  );
};

export default ChangePwd;
