import React, { useState } from 'react';
import './ChangePassword.css';
import playerService from '../../../../services/PlayerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Nouveau mot de passe et confirmation ne correspondent pas');
      return;
    }

    try {
      await playerService.changePassword(oldPassword, newPassword, confirmNewPassword);
      toast.success('Mot de passe modifié avec succès !', {
        position: 'top-right',
        autoClose: 5000,
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setError('');
    } catch (error) {
      setError('Ancien Mot de passe incorrect');
    }
  };

  const toggleShowOldPassword = () => setShowOldPassword(prev => !prev);
  const toggleShowNewPassword = () => setShowNewPassword(prev => !prev);
  const toggleShowConfirmNewPassword = () => setShowConfirmNewPassword(prev => !prev);

  return (
    <form onSubmit={handleSubmit}>
      <div className="settings-body">
        <div className="change-password-title">
          <h1>Changer Mot de Passe</h1>
          {error && <p className="error-pwd-message">{error}</p>}
          <br />
          <div className="change-password-input">
            <div className="input-wrapper">
              <input
                className="input"
                type={showOldPassword ? 'text' : 'password'}
                placeholder="Ancien Mot de Passe"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={toggleShowOldPassword}>
                <FontAwesomeIcon icon={showOldPassword ? faEye : faEyeSlash} />
              </span>
            </div>

            <div className="input-wrapper">
              <input
                className="input"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Nouveau Mot de Passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={toggleShowNewPassword}>
                <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
              </span>
            </div>

            <div className="input-wrapper">
              <input
                className="input"
                type={showConfirmNewPassword ? 'text' : 'password'}
                placeholder="Confirmer Nouveau Mot de Passe"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={toggleShowConfirmNewPassword}>
                <FontAwesomeIcon icon={showConfirmNewPassword ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>
          <button className="save-button" type="submit">Sauvegarder</button>
        </div>
      </div>
    </form >
  );
};

export default ChangePassword;
