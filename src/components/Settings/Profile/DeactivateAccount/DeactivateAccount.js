import React from 'react';
import "./DeactivateAccount.css";
import { toast } from 'react-toastify';
import deactivateIcon from '../../../../assets/Pictures/deactivate-icon.png';
import playerService from '../../../../services/PlayerService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft } from "react-icons/fa";

const DeactivateAccount = ({onBack}) => {

  const navigate = useNavigate();

  const handleDeactivateAccount = async () => {
    try {
      await playerService.deactivateAccount(); 
      toast.success('Votre compte a été désactivé avec succès.');
      localStorage.clear(); 
      navigate('/auth');
    } catch (error) {
      toast.error(`Erreur: ${error.response ? error.response.data : 'Une erreur est survenue.'}`);
    }
  };

  return (
    <form>
      <div className="settings-body">
      <button className="return-button" onClick={onBack}><FaArrowLeft /></button>
        <div className="deactivate-account-title">
          <h1>Désactiver Compte</h1>
          <div className="deactivate-image">
            <img src={deactivateIcon} alt="deactivate-icon" />
          </div>
          <h5>Êtes-vous certain de vouloir désactiver votre compte ?</h5>
          <p>
            La désactivation de votre compte est temporaire, et signifie que votre profil sera masqué jusqu'à ce que
            vous le réactiviez via l'espace d'authentification, veuillez confirmer votre décision en cliquant sur le bouton "Désactiver".
          </p>
          <div>
            <button type="button" className="deactivate-button" onClick={handleDeactivateAccount}>
              <span className="deactivate-button__text">Désactiver</span>
              <span className="deactivate-button__icon">
                <FontAwesomeIcon icon={faBan} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeactivateAccount;
