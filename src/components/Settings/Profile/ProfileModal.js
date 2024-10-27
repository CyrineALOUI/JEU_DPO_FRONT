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

            <button className="settings-buttons"
              onClick={() => {
                playSound();
                handleNavigation('edit_profile');
              }}>
              Editer Profil
            </button>

            <button className="settings-buttons"
              onClick={() => {
                playSound();
                handleNavigation('change_password');
              }}>
              Changer Mot de Passe
            </button>

            <button className="settings-buttons"
              onClick={() => {
                playSound();
                handleNavigation('deactivate_account');
              }}>
              Désactiver Compte
            </button>

            <button className="settings-buttons"
              onClick={() => {
                playSound();
                handleNavigation('delete_account');
              }}>
              Supprimer Compte
            </button>
            
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
