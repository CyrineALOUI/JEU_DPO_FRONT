import React, { useContext } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 
import noLivesIcon from '../../../assets/Pictures/nolives.png';
import playerService from '../../../services/PlayerService'; 
import { LifeTimerContext } from '../../GameHeader/LifeTimer/LifeTimerContext';
import './QuitLevel.css';

const QuitLevel = ({ onBack }) => {
  const navigate = useNavigate();
  const { fetchPlayerData } = useContext(LifeTimerContext);

  const handleQuit = async () => {
    try {
      await playerService.loseLife();
      await fetchPlayerData();
      navigate('/map');
    } catch (error) {
      alert(error.message || 'Une erreur est survenue.');
    }
  };

  return (
      <div className="modal-body">
        <button className="return-quit-button" onClick={onBack}><FaArrowLeft /></button>
        <div className="quit-title">
          <h1>Quitter Niveau</h1>
          <h5>Voulez-vous vraiment abandonner ce niveau ?</h5>
          <div className="quit-image">
            <img src={noLivesIcon} alt="noLives-icon" />
          </div>
          <div>
            <button className="quit-button" onClick={handleQuit}>Quitter</button>
          </div>
        </div>
      </div>
  );
};

export default QuitLevel;
