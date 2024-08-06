import React, { useState, useEffect } from 'react';
import LevelModal from './LevelModal';
import levelService from '../../../services/LevelService';
import './Map.css';

const Map = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (id) => {
    setSelectedLevelId(id);
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const data = await levelService.getAllLevels();
        setLevels(data);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchLevels();
  }, []);


  return (
    <div className="Map-Container">
      {levels.map((level) => (
        <div key={level.id} className="flip-card" onClick={() => toggleModal(level.id)} >
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <p className="title">{level.title}</p>
            </div>
            <div class="flip-card-back">

            </div>
          </div>
        </div>
      ))}
      <LevelModal show={showModal} onClose={() => setShowModal(false)} id={selectedLevelId}>
      </LevelModal>
    </div>
  );
};

export default Map;
