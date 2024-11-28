import React, { useEffect, useState } from 'react';
import badgeService from '../../../services/BadgeService';
import "./LevelBadges.css";
import { FaArrowLeft } from "react-icons/fa";
import { badgeImages } from '../../Utils/BadgesUtils';

const LevelBadges = ({ onBackToSettings }) => {
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  useEffect(() => {
    const fetchUnlockedBadges = async () => {
      try {
        const response = await badgeService.getUnlockedBadgesForPlayer(); 
        setUnlockedBadges(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des badges débloqués:", error);
      }
    };

    fetchUnlockedBadges();
  }, []);

  const allBadges = Object.keys(badgeImages).map(Number);

  return (
    <div className="settings-body">
      <button className="return-button" onClick={onBackToSettings}>
        <FaArrowLeft />
      </button>
      <div className="delete-account-title">
        <h1>Badges</h1>
      </div>

      <div className="badges-grid">
        {allBadges.map((badgeIndex) => (
          <img
            key={badgeIndex}
            src={badgeImages[badgeIndex]}
            alt={`Badge ${badgeIndex}`}
            className={`badge-image ${
              unlockedBadges.includes(badgeIndex) ? 'colored' : 'greyed'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default LevelBadges;
