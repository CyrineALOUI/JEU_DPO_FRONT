import React from "react";
import "./BadgeInfo.css";
import { FaArrowLeft } from "react-icons/fa";

const BadgeInfo = ({ onBack }) => {
  return (
    <div className="settings-body">
        <button className="return-button" onClick={onBack}><FaArrowLeft /></button>
        <div className="badge-info-title">
          <h1>Comment Obtenir des badges ?</h1>
          <br />
  
      <div className="instructions">
        <ul>
          <li>
            <strong>Quiz Game :</strong> Répondez correctement à toutes les questions et obtenez 3 étoiles.
          </li>
          <li>
            <strong>Audio Game :</strong> Choisissez simplement la bonne réponse.
          </li>
          <li>
            <strong>Scenario Game :</strong>   Sélectionnez tous les choix corrects pour les différents scénarios.
          </li>
          <li>
            <strong>Crossword Game :</strong> Révélez tous les mots manuellement, sans utiliser d’indices.
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default BadgeInfo;
