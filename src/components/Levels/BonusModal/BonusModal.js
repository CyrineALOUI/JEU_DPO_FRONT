import React from 'react';
import './BonusModal.css';
import coinBonusIcon from '../../../assets/Pictures/coin-bonus.png';

const BonusModal = ({ totalScore, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="exit-button-level" onClick={onConfirm}>
                    &times;
                </button>

                <div className="modal-body">
                    <div className="success-title">
                        <h2>Score total</h2>
                        <div className="coin-bonus-image">
                            <img src={coinBonusIcon} alt="bonus-icon" />
                        </div>
                        <p>Vous avez obtenu {totalScore} points</p>
                        <button onClick={onConfirm} className="play-button">
                            Récupérer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BonusModal;
