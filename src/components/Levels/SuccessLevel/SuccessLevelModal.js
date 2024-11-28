import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import levelService from '../../../services/LevelService';
import badgeService from '../../../services/BadgeService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SuccessLevelModal.css';

const SuccessLevelModal = ({ onClose, levelId }) => {
    const [stars, setStars] = useState(0);
    const badgeUnlockCalled = useRef(false);

    useEffect(() => {
        const fetchStarsAndCheckBadge = async () => {
            if (levelId && !badgeUnlockCalled.current) {
                badgeUnlockCalled.current = true;

                try {
                    const starsData = await levelService.getStarsForPlayer(levelId);
                    setStars(starsData);

                    const response = await badgeService.unlockBadgeForQuiz(levelId);

                    if (response?.data === "Badge successfully unlocked for quiz level.") {
                        toast.success("Bravo !🎉 Vous avez débloqué un nouveau badge !");
                    }
                } catch (error) {
                    if (error.response?.data === "Badge already unlocked.") {
                        console.info("Badge déjà débloqué pour ce niveau.");
                    } else {
                        console.error("Erreur lors de la récupération des étoiles ou du badge:", error);
                    }
                }
            } else if (!levelId) {
                console.warn("levelId est undefined.");
            }
        };

        fetchStarsAndCheckBadge();

        return () => {
            badgeUnlockCalled.current = false;
        };
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
