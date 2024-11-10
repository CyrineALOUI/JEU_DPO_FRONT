import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import levelService from '../../../services/LevelService';
import NoLivesModal from '../../NoLives/NoLivesModal';
import { LifeTimerContext } from '../../GameHeader/LifeTimer/LifeTimerContext';
import './FailureLevelModal.css';

const FailureLevelModal = ({ onClose, levelId }) => {
  const [stars, setStars] = useState(0);
  const [showNoLivesModal, setShowNoLivesModal] = useState(false);
  const { playerData, fetchPlayerData } = useContext(LifeTimerContext);

  useEffect(() => {
    const fetchStars = async () => {
      if (levelId) {
        try {
          const starsData = await levelService.getStarsForPlayer(levelId);
          setStars(starsData);
        } catch (error) {
          console.error("Erreur lors de la récupération des étoiles:", error);
        }
      } else {
        console.warn("levelId est undefined.");
      }
    };

    fetchStars();
  }, [levelId]);

  useEffect(() => {
    const updateLivesOnFailure = async () => {
      try {
        await fetchPlayerData();
      } catch (error) {
        console.error("Erreur lors de la mise à jour des vies:", error);
      }
    };

    if (playerData?.lives > 0) {
      updateLivesOnFailure();
    } else {
      setShowNoLivesModal(true);
    }
  }, [fetchPlayerData, playerData]);

  const onReplay = () => {
    if (playerData?.lives === 0) {
      setShowNoLivesModal(true); 
    } else {
      window.location.reload();
    }
  };

  if (showNoLivesModal) {
    return <NoLivesModal onClose={() => setShowNoLivesModal(false)} />;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="exit-button-level" onClick={onClose}>
          &times;
        </button>

        <div className="modal-body">
          <div className="failure-title">
            <h2>Dommage😔</h2>
            <p>Il vous manque encore quelques bonnes réponses pour réussir ce niveau</p>
          </div>

          <div className="stars-success">
            {[...Array(3)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`star ${index < stars ? 'yellow' : 'grey'}`}
              />
            ))}
          </div>
          
          <div className="buttons-container">
            <button className="homefail-button" onClick={onClose}>Carte</button>
            <button className="replay-button" onClick={onReplay}>Rejouer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureLevelModal;
