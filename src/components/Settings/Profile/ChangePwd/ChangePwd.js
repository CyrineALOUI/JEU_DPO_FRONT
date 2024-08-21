import React, { useState } from 'react';
import './ChangePwd.css';
import playerService from '../../../../services/PlayerService';

const ChangePwd = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
          setError('New password and confirm password do not match');
          return;
        }
    
        try {
          await playerService.changePassword(oldPassword, newPassword, confirmNewPassword);
          setSuccess('Password changed successfully.');
          setOldPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
          setError('');
        } catch (error) {
          setError('Failed to change password. Please try again.');
        }
      };


    return (
        <form onSubmit={handleSubmit}>
            <div className="settings-body">
                <div className="settings-title">
                    <h1>Changer Mot De Passe</h1>

                    <div className="coolinput">
                        <label className="text" htmlFor="oldPassword">Ancien Mot de Passe</label>
                        <input className="input" type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>

                        <label className="text" htmlFor="newPassword">Nouveau Mot de Passe</label>
                        <input className="input" type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

                        <label className="text" htmlFor="confirmNewPassword">Confirmer Mot de Passe</label>
                        <input className="input" type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </div>
                    <button className="save-button" type="submit">Sauvegarder</button>
                </div>
            </div>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </form>
    );
};

export default ChangePwd;
