import React, { useState } from 'react';
import './GameHeader.css';
import coinImage from '../../assets/coin.png';
import heartImage from '../../assets/heart.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from '../Settings/settingsModal';


const GameHeader = ({ coins }) => {

  const [showModal, setShowModal] = useState(false);

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };



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
              <div className="coins-text">{coins || 0}</div>
            </div>
          </div>
        </div>
        <div className="game-lives">
          <div className="card">
            <div className="card-info">
              <img src={heartImage} alt="Lives" className="icon" />
              <div className="lives-text">3</div>
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
