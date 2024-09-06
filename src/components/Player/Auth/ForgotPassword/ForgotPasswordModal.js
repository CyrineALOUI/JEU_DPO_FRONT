import React, { useState } from 'react';
import './ForgotPasswordModal.css';
import { toast } from 'react-toastify';
import playerService from '../../../../services/PlayerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ForgotPasswordModal = ({ show, onClose }) => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await playerService.forgotPassword(forgotPasswordEmail);
      toast.success('Un e-mail de réinitialisation a été envoyé.', {
        position: 'top-right',
        autoClose: 5000,
      });
      setForgotPasswordEmail('');
      onClose();
    } catch (err) {
      console.error('Erreur de réinitialisation du mot de passe:', err);
      toast.error("L'e-mail n'existe pas dans notre base de données.", {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!show) return null;

  return (
    <div className="password-modal">
      <div className="password-content">
        <button className="exit-button-password" onClick={handleClose}>
          &times;
        </button>
        <h2>Réinitialiser votre Mot de Passe</h2>
        <form className="Form" onSubmit={handleForgotPassword}>
          <div className="FormGroup">
            <span className="icon-password">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              className="input-password"
              placeholder="Entrez votre adresse mail"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
          </div>
          <button className="button-password" type="submit"> Envoyer <span></span></button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
