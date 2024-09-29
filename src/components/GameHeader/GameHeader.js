import React, { useEffect, useState } from 'react';
import './GameHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from '../Settings/settingsModal';
import playerService from '../../services/PlayerService';
import { useScore } from './Score/ScoreContext';
import logo from '../../assets/Pictures/logo.png'

const GameHeader = () => {

  const { score } = useScore();
  const [showModal, setShowModal] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const data = await playerService.getPlayerData();
        setPlayerData(data);
      } catch (err) {
        setError('Failed to load player data');
        console.error('Error fetching player data:', err);
      }
    };

    fetchPlayerData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
   
    <div className="game-header">
      <div className="game-logo">
        <img src={logo} alt="Game Logo" className="logo-image" />
      </div>

      {/* Coins and Lives */}
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
              {/*<img src={heartImage} alt="Lives" className="icon" />*/}
              <svg height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="lives">
                <path d="M0 0H24V24H0z" fill="none"></path>
                <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z">
                </path></svg>
              <div className="lives-text">{playerData?.lives}</div>
            </div>
          </div>
        </div>
      </div>


      {/* Settings Buttons */}
      <div className="game-settings">
        <div className="button-container">
          <a title="Home" href="/map">
            <FontAwesomeIcon icon={faHome} />
          </a>

          <a title="Settings" onClick={handleSettingsClick}>
            <FontAwesomeIcon icon={faCog} />
          </a>

        </div>
        <SettingsModal show={showModal} onClose={handleCloseModal} />
      </div>
    </div>


  );
};

export default GameHeader;
