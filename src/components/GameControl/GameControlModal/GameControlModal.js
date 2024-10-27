import React, { useState } from 'react';
import './GameControlModal.css';
import clickSound from '../../../assets/Sound/click-sound.wav';
import { playClickSound } from '../../Utils/SoundUtils';
import { IoCloseSharp } from "react-icons/io5";
import QuitLevel from '../QuitLevel/QuitLevel';

const GameControlModal = ({ show, onClose, onResume }) => {
  const [currentView, setCurrentView] = useState('game-main');

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

              {/* Bouton Reprendre */}
              <button className="settings-buttons" onClick={handleResume}>
                Reprendre
              </button>

              {/* Bouton Rejouer */}
              <button className="settings-buttons"
                onClick={() => {
                  playSound();
                  handleNavigation('replay');
                }}>
                Rejouer
              </button>

              {/* Bouton Quitter */}
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
