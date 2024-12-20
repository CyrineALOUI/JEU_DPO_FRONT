import React, { useState } from 'react';
import "./DeleteAccount.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import deleteIcon from '../../../../assets/Pictures/delete-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import playerService from '../../../../services/PlayerService'; 
import { FaArrowLeft } from "react-icons/fa";

const DeleteAccount = ({onBack}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      const playerData = await playerService.getPlayerData();
      const playerEmail = playerData.email;

      await playerService.deletePlayerAccount(playerEmail, password);
      toast.success("Compte supprimé avec succès.");
      localStorage.clear();
      navigate('/auth');
    } catch (error) {
      let errorMessage = 'Une erreur est survenue.';
      if (error.response) {
        switch (error.response.data) {
          case 'Invalid password':
            errorMessage = 'Mot de passe invalide.';
            break;
          default:
            errorMessage = error.response.data || 'Une erreur est survenue.';
            break;
        }
      }
      toast.error(errorMessage);
    }
  };


  return (
    <form onSubmit={handleDeleteAccount}>
      <div className="settings-body">
      <button className="return-button" onClick={onBack}><FaArrowLeft /></button>
        <div className="delete-account-title">
          <h1>Supprimer Compte</h1>
          <div className="delete-image">
            <img src={deleteIcon} alt="delete-icon" />
          </div>
          <h5>Êtes-vous certain de vouloir supprimer définitivement votre compte ?</h5>
          <p>
            Cette action est irréversible et entraînera la perte de toutes vos données,
            veuillez confirmer votre décision en tapant votre mot de passe et en cliquant sur le bouton "Supprimer".
          </p>
          <div className="delete-account-input">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre Mot de Passe"
              required
            />
            <span className="eye-icon" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          <div>
            <button type="submit" className="delete-button">
              <span className="delete-button__text">Supprimer</span>
              <span className="delete-button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="512" viewBox="0 0 512 512" height="512" className="svg">
                  <path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" />
                  <line y2="112" y1="112" x2="432" x1="80" />
                  <path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" />
                  <line y2="400" y1="176" x2="256" x1="256" />
                  <line y2="400" y1="176" x2="192" x1="184" />
                  <line y2="400" y1="176" x2="320" x1="328" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeleteAccount;
