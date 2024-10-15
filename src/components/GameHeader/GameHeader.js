import React, { useEffect, useState } from 'react';
import './GameHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from '../Settings/settingsModal';
import playerService from '../../services/PlayerService';
import { useScore } from './Score/ScoreContext';
import logo from '../../assets/Pictures/logo.png';

const GameHeader = () => {
  const { score } = useScore();
  const [showModal, setShowModal] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [totalTimer, setTotalTimer] = useState(0);

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchPlayerData = async () => {
    try {
      const data = await playerService.getPlayerData();
      setPlayerData(data);
      if (data.livesRecoveryTimers && Array.isArray(data.livesRecoveryTimers)) {
        initializeTotalTimer(data.livesRecoveryTimers);
      }
    } catch (err) {
      setError('Failed to load player data');
      console.error('Error fetching player data:', err);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const initializeTotalTimer = (recoveryTimers) => {
    if (recoveryTimers.length > 0) {
      const nextTimer = new Date(recoveryTimers[0]) - new Date(); // Calculer le temps restant pour le premier timer
      setTotalTimer(nextTimer > 0 ? nextTimer : 0);
    } else {
      setTotalTimer(0); // Pas de timers en cours
    }
  };

  // Mettre à jour le timer toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Récupérer les vies lorsque le timer est à zéro
  useEffect(() => {
    const recoverLife = async () => {
      try {
        await playerService.recoverLife(); // Appel pour récupérer les vies
        fetchPlayerData(); // Mettre à jour les données du joueur et réinitialiser le timer
      } catch (err) {
        console.error('Error recovering lives:', err);
      }
    };

    if (totalTimer === 0 && playerData?.lives < 5) {
      recoverLife();
    }
  }, [totalTimer, playerData]);


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
