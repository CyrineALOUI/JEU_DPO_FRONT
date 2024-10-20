import React, { useState } from 'react';
import './GameControl.css';
import GameControlModal from './GameControlModal/GameControlModal';

const GameControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="game-control-container">
      <input 
        type="checkbox" 
        className="play-btn" 
        id="playPause" 
        checked={isPlaying} 
        onChange={togglePlay} 
      />
      
      {/* Icône Play */}
      <label 
        htmlFor="playPause" 
        className={`play-icon ${isPlaying ? 'hidden' : ''}`}
      ></label>

      {/* Icône Pause */}
      <div className={`pause-icon ${isPlaying ? '' : 'hidden'}`}>
        <span></span>
      </div>

      {/* Modal si le jeu est en pause */}
      {isModalOpen && <GameControlModal onClose={handleCloseModal} />}

    </div>
  );
};

export default GameControl;
