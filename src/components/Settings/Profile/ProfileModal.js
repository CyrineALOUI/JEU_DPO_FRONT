import React, { useState } from 'react';
import EditProfile from './EditProfile/EditProfile';
import ChangePassword from './ChangePassword/ChangePassword';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import clickSound from '../../../assets/Sound/click-sound.wav'
import { playClickSound } from '../../Utils/SoundUtils';
import DeactivateAccount from './DeactivateAccount/DeactivateAccount';
import { FaArrowLeft } from "react-icons/fa";
import './ProfileModal.css';

const ProfileModal = ({ onBackToSettings }) => {
  const [currentView, setCurrentView] = useState('profile_main');

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('profile_main');
  };

  const playSound = () => {
    playClickSound(clickSound);
  };

  return (

    <div>
      {currentView === 'profile_main' && (
        <div className="settings-body-profile">
          <button class="return-button" onClick={onBackToSettings}><FaArrowLeft /></button>
          <div class="form-title-profile"><h1>Mon Compte</h1></div>
          <div className="settings-container-profile">
            <input className="input-btn" type="radio" id="valueIs-1" name="valueIs-radio" value="valueIs-1" />
            <label className="neon-btn"
              onClick={() => {
                playSound();
                handleNavigation('edit_profile');
              }}>
              <span className="span"></span>
              <span className="txt">Editer Profil</span>
            </label>

            <input className="input-btn" type="radio" id="valueIs-2" name="valueIs-radio" value="valueIs-2" />
            <label className="neon-btn"
              onClick={() => {
                playSound();
                handleNavigation('change_password');
              }}>
              <span className="span"></span>
              <span className="txt">Changer Mot de Passe</span>
            </label>

            <input className="input-btn" type="radio" id="valueIs-3" name="valueIs-radio" value="valueIs-3" />
            <label className="neon-btn"
              onClick={() => {
                playSound();
                handleNavigation('deactivate_account');
              }}>
              <span className="span"></span>
              <span className="txt">Désactiver Compte</span>
            </label>

            <input className="input-btn" type="radio" id="valueIs-4" name="valueIs-radio" value="valueIs-4" />
            <label className="neon-btn"
              onClick={() => {
                playSound();
                handleNavigation('delete_account');
              }}>
              <span className="span"></span>
              <span className="txt">Supprimer Compte</span>
            </label>
          </div>
        </div>
      )}

      {currentView === 'edit_profile' && <EditProfile onBack={handleBack} />}
      {currentView === 'change_password' && <ChangePassword onBack={handleBack} />}
      {currentView === 'delete_account' && <DeleteAccount onBack={handleBack} />}
      {currentView === 'deactivate_account' && <DeactivateAccount onBack={handleBack} />}

    </div>

  );
};

export default ProfileModal;
