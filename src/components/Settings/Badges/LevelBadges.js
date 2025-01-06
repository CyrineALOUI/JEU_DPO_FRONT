import React, { useEffect, useState } from "react";
import badgeService from "../../../services/BadgeService";
import "./LevelBadges.css";
import { FaArrowLeft } from "react-icons/fa";
import { badgeImages } from "../../Utils/BadgesUtils";
import BadgeInfo from "./BadgeInfo/BadgeInfo";

const LevelBadges = ({ onBackToSettings }) => {
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [currentView, setCurrentView] = useState("badge_view"); 

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

  const handleNavigation = (view) => {
    setCurrentView(view); 
  };

  const allBadges = Object.keys(badgeImages).map(Number);

  return (
    <div className="settings-body">
      {currentView === "badge_view" && (
        <>
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
                  unlockedBadges.includes(badgeIndex) ? "colored" : "greyed"
                }`}
              />
            ))}
          </div>

          <div className="info">
            <div
              className="info__icon"
              onClick={() => handleNavigation("badge_instructions")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                height="24"
                fill="none"
              >
                <path
                  fill="#393a37"
                  d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
                ></path>
              </svg>
            </div>
          </div>
        </>
      )}

      {currentView === "badge_instructions" && <BadgeInfo onBack={() => handleNavigation("badge_view")} />}
    </div>
  );
};

export default LevelBadges;
