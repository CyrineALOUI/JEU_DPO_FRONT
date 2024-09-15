import React, { useState, useEffect } from 'react';
import "./DeactivateAccount.css";
import { toast } from 'react-toastify';
import deactivateIcon from '../../../../assets/Pictures/deactivate-icon.png';
import playerService from '../../../../services/PlayerService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const DeactivateAccount = () => {
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const fetchPlayerData = async () => {
    try {
      const playerData = await playerService.getPlayerData();
      setId(playerData.id);
    } catch (error) {
      console.error('Failed to fetch player data:', error);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const handleDeactivate = async (e) => {
    e.preventDefault();

    try {
      await playerService.deactivateAccount(id);
      toast.success('Compte désactivé avec succès !', {
        position: 'top-right',
        autoClose: 5000,
      });
      navigate('/auth');
    } catch (error) {
      toast.error('Une erreur est survenue lors de la désactivation.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleDeactivate}>
      <div className="settings-body">
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
            <button type="submit" className="deactivate-button">
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
