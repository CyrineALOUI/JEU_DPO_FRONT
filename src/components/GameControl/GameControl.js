import React, { useState } from 'react';
import './GameControl.css';
import GameControlModal from './GameControlModal/GameControlModal';

const GameControl = ({ isPaused, setIsPaused }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePlay = () => {
    const nextPlayingState = !isPaused;
    setIsPaused(nextPlayingState);

    if (nextPlayingState) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsModalOpen(false);
  };

  return (
    <div className="game-control-container">
      <input 
        type="checkbox" 
        className="play-btn" 
        id="playPause" 
        checked={isPaused} 
        onChange={togglePlay}
      />
      <label htmlFor="playPause" className={`play-icon ${isPaused ? 'hidden' : ''}`}></label>
      <div className={`pause-icon ${isPaused ? '' : 'hidden'}`}>
        <span></span>
      </div>
      <GameControlModal show={isModalOpen} onClose={handleCloseModal} onResume={handleResume} />
    </div>
  );
};

export default GameControl;
