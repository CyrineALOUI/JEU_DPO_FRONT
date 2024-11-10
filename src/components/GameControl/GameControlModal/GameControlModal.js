import React, { useState, useContext } from 'react';
import './GameControlModal.css';
import clickSound from '../../../assets/Sound/click-sound.wav';
import { playClickSound } from '../../Utils/SoundUtils';
import { IoCloseSharp } from "react-icons/io5";
import QuitLevel from '../QuitLevel/QuitLevel';
import NoLivesModal from '../../NoLives/NoLivesModal';
import { LifeTimerContext } from '../../GameHeader/LifeTimer/LifeTimerContext';
import playerService from '../../../services/PlayerService';
import { useNavigate } from 'react-router-dom';

const GameControlModal = ({ show, onClose, onResume }) => {
  const [currentView, setCurrentView] = useState('game-main');
  const [showNoLivesModal, setShowNoLivesModal] = useState(false);
  const { playerData, fetchPlayerData } = useContext(LifeTimerContext);
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const playSound = () => {
    playClickSound(clickSound);
  };

  const handleClose = () => {
    playSound();
    onClose();
  };

  const handleBack = () => {
    setCurrentView('game-main');
  };

  const handleResume = () => {
    playSound();
    onResume();
    onClose();
  };

  const handleNoLivesClose = () => {
    setShowNoLivesModal(false);
    navigate('/map');
  };

  const handleReplay = async () => {
    playSound();

    if (playerData?.lives > 0) {
      try {
        await playerService.loseLife();
        await fetchPlayerData();
        window.location.reload();
      } catch (error) {
        console.error("Erreur lors de la diminution des vies:", error);
      }
    } else {
      setShowNoLivesModal(true);
    }
  };

  if (showNoLivesModal) {
    return (
      <div className="no-lives-wrapper">
        <NoLivesModal onClose={handleNoLivesClose}/>
      </div>
    );
  }

  return (
    <div className="pause-game-modal">
      <div className="modal-content">
        <button className="exit-button-level" onClick={handleClose}>
          <IoCloseSharp />
        </button>

        {currentView === 'game-main' && (
          <div className="modal-body">
            <div className="pause-title"><h1>Pause</h1></div>
            <div className="game-container">
              <button className="settings-buttons" onClick={handleResume}>
                Reprendre
              </button>
              <button className="settings-buttons" onClick={handleReplay}>
                Rejouer
              </button>
              <button className="settings-buttons"
                onClick={() => {
                  playSound();
                  handleNavigation('quit');
                }}>
                Quitter
              </button>
            </div>
          </div>
        )}

        {currentView === 'quit' && <QuitLevel onBack={handleBack} />}
      </div>
    </div>
  );
};

export default GameControlModal;
