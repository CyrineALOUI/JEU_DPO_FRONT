import React, { useState } from 'react';
import './ActivateAccountModal.css';
import { toast } from 'react-toastify';
import playerService from '../../../../services/PlayerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ActivateAccountModal = ({ show, onClose }) => {
  {/*const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await playerService.forgotPassword(forgotPasswordEmail);
      toast.success('Un e-mail de réinitialisation de votre mot de passe a été envoyé avec succès.', {
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
  }; */}

  const handleClose = () => {
    onClose();
  };

  if (!show) return null;

  return (
    <div className="activate-account-modal">
      <div className="activate-account-content">
        <button className="exit-button-activate" onClick={handleClose}>
          &times;
        </button>
        <h2>Activez votre Compte</h2>
        <p>Un e-mail contenant votre code d'activation de compte a été envoyé, veuillez vérifier votre boîte de réception pour finaliser cette étape.</p>
        <form className="activate-form">
          <div class="input-fields">
            <input placeholder="" type="tel" maxlength="1" />
              <input placeholder="" type="tel" maxlength="1" />
                <input placeholder="" type="tel" maxlength="1" />
                  <input placeholder="" type="tel" maxlength="1" />
                  </div>

                </form>
              </div>
              
          </div>
          );
};

          export default ActivateAccountModal;
