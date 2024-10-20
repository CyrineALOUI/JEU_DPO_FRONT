import React, { useState } from 'react';
import './GameControlModal.css';
import clickSound from '../../../assets/Sound/click-sound.wav';
import { playClickSound } from '../../Utils/SoundUtils';
import { IoCloseSharp } from "react-icons/io5";

const GameControlModal = ({ show, onClose }) => {
  const [currentView, setCurrentView] = useState('game_main');

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

  return (
    <div className="game-modal">
      <div className="game-content">
        <button className="exit-button" onClick={handleClose}>
          <IoCloseSharp />
        </button>

        {currentView === 'game_main' && (
          <div className="game-body">
            <div className="form-title"><h1>Jeu</h1></div>
            <div className="game-container">
              
              {/* Bouton Jouer */}
              <label className="neon-btn" 
                onClick={() => {
                  playSound();
                  handleNavigation('play');
                }}>
                <span className="span"></span>
                <span className="txt">Jouer</span>
              </label>

              {/* Bouton Rejouer */}
              <label className="neon-btn" 
                onClick={() => {
                  playSound();
                  handleNavigation('replay');
                }}>
                <span className="span"></span>
                <span className="txt">Rejouer</span>
              </label>

              {/* Bouton Abandonner */}
              <label className="neon-btn" 
                onClick={() => {
                  playSound();
                  handleNavigation('quit');
                }}>
                <span className="span"></span>
                <span className="txt">Abandonner</span>
              </label>

              {/* Bouton Quitter */}
              <label className="neon-btn" 
                onClick={() => {
                  playSound();
                  handleClose();
                }}>
                <span className="span"></span>
                <span className="txt">Quitter</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameControlModal;
