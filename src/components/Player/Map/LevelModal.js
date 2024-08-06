import React, { useState, useEffect } from 'react';
import levelService from '../../../services/LevelService';
import './LevelModal.css';

const LevelModal = ({ show, onClose, id }) => {
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchLevel = async () => {
        try {
          const data = await levelService.getLevelById(id);
          setLevel(data);
        } catch (error) {
          setError('Failed to fetch level');
        }
      };

      fetchLevel();
    }
  }, [id]);

  const handlePlayClick = () => {
    if (level) {
      console.log('Level:', level); // Ajouter ce log
      if (level.games && level.games.length > 0) {
        // Trouver le jeu de mots croisés dans les jeux associés
        const quizGame = level.games.find(game => game.id !== undefined);
        const crosswordGame = level.games.find(game => game.gridSize !== undefined);

        if (crosswordGame) {
          window.location.href = `/crossword/${crosswordGame.id}`;
        } else if (quizGame) {
          window.location.href = `/quiz/${quizGame.id}`;
        }
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="exit-button" onClick={onClose}>
          &times;
        </button>
        {error && <div>{error}</div>}
        {level && (
          <div className="modal-body">
            <h1>{level.title}</h1>
            <div className="stars">
              {/* Replace with actual stars component or icons */}
              ⭐⭐⭐
            </div>
            <p>{level.description}</p>
            <p>Diificulté : {level.difficulty}</p>
            <button className="play-button" onClick={handlePlayClick}>
              Jouer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelModal;
