import React, { useEffect, useState } from 'react';
import "./LevelBadges.css";
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from "react-icons/fa";
import levelService from '../../../services/LevelService';

import badge1 from '../../../assets/Pictures/badges/level1.png';
import badge2 from '../../../assets/Pictures/badges/level2.png';
import badge3 from '../../../assets/Pictures/badges/level3.png';
import badge4 from '../../../assets/Pictures/badges/level4.png';
import badge5 from '../../../assets/Pictures/badges/level5.png';
import badge6 from '../../../assets/Pictures/badges/level6.png';
import badge7 from '../../../assets/Pictures/badges/level7.png';
import badge8 from '../../../assets/Pictures/badges/level8.png';
import badge9 from '../../../assets/Pictures/badges/level9.png';
import badge10 from '../../../assets/Pictures/badges/level10.png';
import badge11 from '../../../assets/Pictures/badges/level11.png';
import badge12 from '../../../assets/Pictures/badges/level12.png';

const badges = [
  badge1, badge2, badge3,
  badge4, badge5, badge6,
  badge7, badge8, badge9,
  badge10, badge11, badge12,
];

const LevelBadges = ({ onBackToSettings }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const starsData = await Promise.all(badges.map((_, index) => 
          levelService.getStarsForPlayer(index + 1)
        ));
        setStars(starsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des étoiles:", error);
      }
    };
    fetchStars();
  }, []);

  return (
    <div className="settings-body">
      <button className="return-button" onClick={onBackToSettings}><FaArrowLeft /></button>
      <div className="delete-account-title">
        <h1>Badges</h1>
      </div>

      <div className="badges-grid">
        {badges.map((badge, index) => (
          <img
            key={index}
            src={badge}
            alt={`Badge ${index + 1}`}
            className={`badge-image ${stars[index] === 3 ? 'colored' : 'greyed'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelBadges;