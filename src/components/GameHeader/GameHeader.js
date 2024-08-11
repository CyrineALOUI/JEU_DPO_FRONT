import React from 'react';
import './GameHeader.css';
import coinImage from '../../assets/coin.png';
import heartImage from '../../assets/heart.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';


const GameHeader = ({ coins }) => {
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
          <FontAwesomeIcon icon={faHome}/>
          </a>

          <a title="Settings" href="#">
          <FontAwesomeIcon icon={faCog}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
