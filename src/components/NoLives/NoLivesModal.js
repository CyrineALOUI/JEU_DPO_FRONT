import React, { useContext } from 'react';
import './NoLivesModal.css';
import { LifeTimerContext } from '../GameHeader/LifeTimer/LifeTimerContext';
import nolivesIcon from '../../assets/Pictures/nolives.png';
import playerService from '../../services/PlayerService';
import { toast } from 'react-toastify';

const NoLivesModal = ({ onClose }) => {
  const { totalTimer } = useContext(LifeTimerContext);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleBuyLives = async () => {
    try {
      await playerService.buyLives();
      toast.success("Vies achetées avec succès!");
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue lors de l'achat.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="exit-button-level" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <h2>Pas de vies restantes !</h2>
          <div className="nolives-image">
            <img src={nolivesIcon} alt="nolives-icon" />
          </div>
          <p>Vous n'avez plus de cœurs, revenez plus tard ou recharger des vies.</p>
          <span className="timer-label">Prochaine vie dans :</span>

          <div className="lives-options">
            <div className="game-nolives">
              <div className="card-nolives">
                <div className="card-info-nolives">
                  <div className="lives"></div>
                  <div className="lives-text">
                    {totalTimer > 0 && `${formatTime(totalTimer)}`}
                  </div>
                </div>
              </div>

              <div className="buy-lives">
                <button className="buy-lives-button" onClick={handleBuyLives}>
                  Recharger x1500
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NoLivesModal;
