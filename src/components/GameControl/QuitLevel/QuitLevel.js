import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft } from "react-icons/fa";

const QuitLevel = ({onBack}) => {




  return (
    <form>
      <div className="modal-body">
      <button class="return-button" onClick={onBack}><FaArrowLeft /></button>
        <div className="pause-title">
          <h1>Quitter Niveau</h1>
          <div className="deactivate-image">
           {/*} <img src={deactivateIcon} alt="deactivate-icon" /> */}
          </div>
          <h5>Êtes-vous certain de vouloir désactiver votre compte ?</h5>
          <p>
            La désactivation de votre compte est temporaire, et signifie que votre profil sera masqué jusqu'à ce que
            vous le réactiviez via l'espace d'authentification, veuillez confirmer votre décision en cliquant sur le bouton "Désactiver".
          </p>
          <div>
            <button type="button" className="deactivate-button">
              <span className="deactivate-button__text">Désactiver</span>
              <span className="deactivate-button__icon">
                <FontAwesomeIcon icon={faBan} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuitLevel;
