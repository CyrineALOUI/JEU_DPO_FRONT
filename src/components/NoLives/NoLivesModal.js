import React from 'react';
import './NoLivesModal.css';
import nolivesIcon from '../../assets/Pictures/nolives.png';

const NoLivesModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="exit-button-level" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <h2>Pas de vies restantes !</h2>
          <div className="nolives-image">
            <img src={nolivesIcon} alt="nolives-icon" />
          </div>
          <p>Vous n'avez plus de cœurs. Revenez plus tard ou achetez des cœurs supplémentaires.</p>

          <div className="game-lives">
            <div className="card-nolives">
              <div className="card-info-nolives">
                <div className="lives"></div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default NoLivesModal;
