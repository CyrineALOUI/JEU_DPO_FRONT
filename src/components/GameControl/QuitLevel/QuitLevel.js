import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 
import noLivesIcon from '../../../assets/Pictures/nolives.png';
import playerService from '../../../services/PlayerService'; 
import './QuitLevel.css';

const QuitLevel = ({ onBack }) => {
  const navigate = useNavigate();

  const handleQuit = async (event) => {
    event.preventDefault(); 

    try {
      await playerService.loseLife();
      navigate('/map');
    } catch (error) {
      alert(error.message || 'Une erreur est survenue.'); 
    }
  };

  return (
    <form onSubmit={handleQuit}>
      <div className="modal-body">
        <button className="return-quit-button" onClick={onBack}><FaArrowLeft /></button>
        <div className="quit-title">
          <h1>Quitter Niveau</h1>
          <h5>Voulez-vous vraiment abandonner ce niveau ?</h5>
          <div className="quit-image">
            <img src={noLivesIcon} alt="noLives-icon" />
          </div>
          <div>
            <button className="quit-button" type="submit">Quitter</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuitLevel;
