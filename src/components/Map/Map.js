import React, { useState, useEffect } from 'react';
import LevelModal from '../Levels/LevelModal';
import levelService from '../../services/LevelService';
import GameHeader from '../GameHeader/GameHeader';
import playerService from '../../services/PlayerService';
import './Map.css';

const Map = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState(1); // État pour le niveau débloqué du joueur

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

  return (
    <div className="Map-Container">
      <GameHeader />
      <div className="glass-box">
        {levels.map((level) => (
          <button
            key={level.id}
            className={`level-button ${level.levelNumber <= unlockedLevel ? '' : 'locked'}`} 
            onClick={() => level.levelNumber <= unlockedLevel && toggleModal(level.id)}
          >
            {level.levelNumber}
          </button>
        ))}
      </div>

      <LevelModal show={showModal} onClose={() => setShowModal(false)} id={selectedLevelId} />
    </div>



  );
};

export default Map;
