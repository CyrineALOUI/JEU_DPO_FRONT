import React, { useContext, useState } from 'react';
import './GameHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from '../Settings/settingsModal';
import { LifeTimerContext } from './LifeTimer/LifeTimerContext';
import { useScore } from './Score/ScoreContext';
import logo from '../../assets/Pictures/logo.png';

const GameHeader = () => {
  const { score } = useScore();
  const { playerData, totalTimer } = useContext(LifeTimerContext);
  const [showModal, setShowModal] = useState(false);
  const [error] = useState(null);

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="game-header">
      <div className="game-logo">
        <img src={logo} alt="Game Logo" className="logo-image" />
      </div>

      <div className="game-info">
        <div className="game-coins">
          <div className="card">
            <div className="card-info">
              <div className="coins">
                <div className="coins-text">{score}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="game-lives">
          <div className="card">
            <div className="card-info">
              <div className="lives"></div>
              <div className="lives-text">
                x{playerData?.lives}
                {totalTimer > 0 && (<> | {formatTime(totalTimer)} </>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="game-settings">
        <button title="Settings" onClick={handleSettingsClick}>
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
      <SettingsModal show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default GameHeader;
