import React, { useState, useEffect } from 'react';
import LevelModal from '../Levels/LevelModal';
import levelService from '../../services/LevelService';
import GameHeader from '../GameHeader/GameHeader';
import playerService from '../../services/PlayerService';
import './Map.css';
import GameControl from '../GameControl/GameControl';
import lockIcon from '../../assets/Pictures/lock-icon.png';

const Map = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollDirection, setScrollDirection] = useState('');
  const levelsPerPage = 6;

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const data = await levelService.getAllLevels();
        setLevels(data);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    const fetchPlayerData = async () => {
      try {
        const playerData = await playerService.getPlayerData();
        setUnlockedLevel(playerData.unlockedLevel);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchLevels();
    fetchPlayerData();
  }, []);

  const toggleModal = (id) => {
    setSelectedLevelId(id);
    setShowModal(!showModal);
  };

  const indexOfLastLevel = currentPage * levelsPerPage;
  const indexOfFirstLevel = indexOfLastLevel - levelsPerPage;
  const currentLevels = levels.slice(indexOfFirstLevel, indexOfLastLevel);

  const nextPage = () => {
    if (currentPage * levelsPerPage < levels.length) {
      setScrollDirection('left');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setScrollDirection('');
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setScrollDirection('right');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setScrollDirection('');
      }, 300);
    }
  };

  return (
    <div className="Map-Container">
      <GameHeader />
      <GameControl />
      <div className="glass-box">
        <h2>Carte</h2>
        <div className={`levels-grid ${scrollDirection}`}>
          {currentLevels.map((level) => (
            <button
              key={level.id}
              className={`level-button ${level.levelNumber <= unlockedLevel ? '' : 'locked'}`}
              onClick={() => level.levelNumber <= unlockedLevel && toggleModal(level.id)}
              title={level.levelNumber <= unlockedLevel ? "Débloqué" : "Niveau verrouillé"}
            >
              {level.levelNumber <= unlockedLevel ? (
                <>
                  {level.levelNumber}
                  <div className="drop1"></div>
                  <div className="drop2"></div>
                </>
              ) : (
                <img src={lockIcon} alt="Locked" className="lock-icon" />
              )}
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div className="button-box-container">
          <button className="button-3d" onClick={prevPage} disabled={currentPage === 1}>
            <div className="button-top">
              <span className="material-icons">❮</span>
            </div>
            <div className="button-bottom"></div>
          </button>
          <button className="button-3d" onClick={nextPage} disabled={currentPage * levelsPerPage >= levels.length}>
            <div className="button-top">
              <span className="material-icons">❯</span>
            </div>
            <div className="button-bottom"></div>
          </button>
        </div>
      </div>

      <LevelModal show={showModal} onClose={() => setShowModal(false)} id={selectedLevelId} />
    </div>
  );
};

export default Map;
