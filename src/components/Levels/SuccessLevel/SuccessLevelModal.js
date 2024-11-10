import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import levelService from '../../../services/LevelService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SuccessLevelModal.css';

const SuccessLevelModal = ({ onClose, levelId }) => {
    const [stars, setStars] = useState(0);

    useEffect(() => {
        const fetchStars = async () => {
            if (levelId) {
                try {
                    const starsData = await levelService.getStarsForPlayer(levelId);
                    setStars(starsData);

                    // Vérifier si le badge a déjà été débloqué pour ce niveau
                    const badgeUnlockedKey = `badgeUnlocked_${levelId}`;
                    const isBadgeUnlocked = sessionStorage.getItem(badgeUnlockedKey);

                    // Si le joueur a 3 étoiles et que le badge n'est pas encore déverrouillé
                    if (starsData === 3 && !isBadgeUnlocked) {
                        toast.success("Bravo, vous avez débloqué un nouveau badge!");
                        // Marquer le badge comme débloqué dans la session
                        sessionStorage.setItem(badgeUnlockedKey, 'true');
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des étoiles:", error);
                }
            } else {
                console.warn("levelId est undefined.");
            }
        };

        fetchStars();
    }, [levelId]);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="exit-button-level" onClick={onClose}>
                    &times;
                </button>

                <div className="modal-body">
                    <div className="success-title">
                        <h2>Félicitations🎉</h2>
                        <p>Vous avez réussi le niveau ! </p>
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
                    <button className="home-button" onClick={onClose}>Continuer</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessLevelModal;
