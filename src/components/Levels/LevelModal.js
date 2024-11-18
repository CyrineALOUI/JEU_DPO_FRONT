import React, { useState, useEffect } from 'react';
import levelService from '../../services/LevelService';
import playerService from '../../services/PlayerService';
import './LevelModal.css';
import NoLivesModal from '../NoLives/NoLivesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const LevelModal = ({ show, onClose, id }) => {
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);
  const [lives, setLives] = useState(null);
  const [stars, setStars] = useState(0);
  const [isCrossword, setIsCrossword] = useState(false);
  const [isScenarioGame, setIsScenarioGame] = useState(false); 

  useEffect(() => {
    if (id) {
      const fetchLevel = async () => {
        try {
          const data = await levelService.getLevelById(id);
          setLevel(data);

          const crosswordGame = data.games?.some(game => game.gridSize !== undefined);
          setIsCrossword(!!crosswordGame);

          const scenarioGame = data.games?.some(game => game.scenarioLevelNumber !== undefined);
          setIsScenarioGame(!!scenarioGame);

          //Recuperation des etoiles pour chaque joueur / chaque level
          if (!crosswordGame && !scenarioGame) {
            const playerStars = await levelService.getStarsForPlayer(id);
            setStars(playerStars);
          }
        } catch (error) {
          setError('Failed to fetch level');
        }
      };

      const fetchPlayerLives = async () => {
        try {
          const playerData = await playerService.getPlayerData();
          setLives(playerData.lives);
        } catch (error) {
          setError('Failed to fetch player lives');
        }
      };

      fetchLevel();
      fetchPlayerLives();
    }
  }, [id]);

  const handlePlayClick = () => {
    if (level) {
      console.log('Level:', level);
      if (level.games && level.games.length > 0) {
        // Types de jeux (Quiz, Crossword, Scenario)
        const quizGame = level.games.find(game => game.introductionText !== undefined);
        const crosswordGame = level.games.find(game => game.gridSize !== undefined);
        const scenarioGame = level.games.find(game => game.scenarioLevelNumber !== undefined); 
  
        if (crosswordGame) {
          window.location.href = `/crossword/${crosswordGame.id}`;
        } else if (quizGame) {
          window.location.href = `/quiz/${quizGame.id}`;
        } else if (scenarioGame) {
          // Assure-toi que c'est bien une route de scénario
          window.location.href = `/scenario/${scenarioGame.id}`;
        } else {
          console.error('Aucun jeu valide trouvé');
        }
      }
    }
  };
  

  const handlePassClick = async () => {
    try {
      await playerService.unlockNextLevel(level.levelNumber); 
      window.location.reload(); 
    } catch (error) {
      console.error('Erreur lors du déverrouillage du niveau suivant:', error);
    }
  };
  
  if (!show) {
    return null;
  }

  if (lives === 0) {
    return <NoLivesModal onClose={onClose} />;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="exit-button-level" onClick={onClose}>
          &times;
        </button>
        {error && <div>{error}</div>}
        {level && (
          <div className="modal-body">
            <h1>{level.title}</h1>

            {!isCrossword && !isScenarioGame && (
              <div className="stars">
                {[...Array(3)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={`star ${index < stars ? 'yellow' : 'grey'}`}
                  />
                ))}
              </div>
            )}

            <p>{level.description}</p>
            <div className="buttons-container">
              <button className="play-button" onClick={handlePlayClick}>
                Jouer
              </button>

              {isCrossword && (
                <button className="skip-button" onClick={handlePassClick}>
                  Passer
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelModal;
