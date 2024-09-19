import React, { useState } from 'react';
import './ActivateAccountModal.css';
import { toast } from 'react-toastify';
import playerService from '../../../../services/PlayerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ActivateAccountModal = ({ show, onClose }) => {

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
          <div className="input-fields">
            <input placeholder="" type="tel" maxLength="1" />
            <input placeholder="" type="tel" maxLength="1" />
            <input placeholder="" type="tel" maxLength="1" />
            <input placeholder="" type="tel" maxLength="1" />
          </div>

          <div className="action-btns">
          <button className="button-activate" type="submit"> Vérifier <span></span></button>
          <button className="button-clear" type="submit"> Effacer <span></span></button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default ActivateAccountModal;
