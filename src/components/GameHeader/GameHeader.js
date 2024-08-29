import React, { useEffect, useState } from 'react';
import './GameHeader.css';
import coinImage from '../../assets/Pictures/coin.png';
import heartImage from '../../assets/Pictures/heart.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from '../Settings/settingsModal';
import playerService from '../../services/PlayerService';
import { useScore } from './Score/ScoreContext';



const GameHeader = ({ coins }) => {

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
      {/* Logo */}
      <div className="game-logo">

      </div>

      {/* Coins and Lives */}
      <div className="game-info">
        <div className="game-coins">
          <div className="card">
            <div className="card-info">
              <img src={coinImage} alt="Coin" className="icon" />
              <div className="coins-text">{score}</div>
            </div>
          </div>
        </div>
        <div className="game-lives">
          <div className="card">
            <div className="card-info">
              <img src={heartImage} alt="Lives" className="icon" />
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
