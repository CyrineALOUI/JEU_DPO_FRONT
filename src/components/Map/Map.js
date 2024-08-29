import React, { useState, useEffect, useMemo } from 'react';
import LevelModal from '../Levels/LevelModal';
import levelService from '../../services/LevelService';
import GameHeader from '../GameHeader/GameHeader';
import playerService from '../../services/PlayerService';
import './Map.css';

const Map = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState(1);  // État pour le niveau débloqué du joueur
  const [currentPage, setCurrentPage] = useState(1);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedLevels = useMemo(() => {
    const startIndex = (currentPage - 1) * levelsPerPage;
    return levels.slice(startIndex, startIndex + levelsPerPage);
  }, [levels, currentPage]);

  const totalPages = Math.ceil(levels.length / levelsPerPage);

  return (
    <div className="Map-Container">
      <GameHeader />
      <div className="levels-grid">
        {paginatedLevels.map((level) => (
          <div
            key={level.id}
            className={`flip-card ${level.levelNumber <= unlockedLevel ? '' : 'locked'}`}  
            onClick={() => level.levelNumber <= unlockedLevel && toggleModal(level.id)}  
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">{level.title}</p>
              </div>
              <div className="flip-card-back">
                {level.levelNumber <= unlockedLevel ? (
                  <p>Débloqué</p>
                ) : (
                  <p>Bloqué</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <LevelModal show={showModal} onClose={() => setShowModal(false)} id={selectedLevelId}></LevelModal>
    </div>
  );
};

export default Map;
