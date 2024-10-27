import React, { useState } from 'react';
import ProfileModal from './Profile/ProfileModal';
import './SettingsModal.css';
import clickSound from '../../assets/Sound/click-sound.wav';
import { playClickSound } from '../Utils/SoundUtils';
import { IoCloseSharp } from "react-icons/io5";

const SettingsModal = ({ show, onClose }) => {
  const [currentView, setCurrentView] = useState('settings_main');

  if (!show) {
    return null;
  }

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const handleBackToSettings = () => {
    setCurrentView('settings_main');
  };

  const playSound = () => {
    playClickSound(clickSound);
  };

  const handleClose = () => {
    playSound();
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/auth";
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <button class="exit-button" onClick={handleClose}><IoCloseSharp /></button>
        {currentView === 'settings_main' && (
          <div className="settings-body">
            <div class="form-title"><h1>Paramètres</h1></div>
            <div className="settings-container">

              <button className="settings-buttons"
                onClick={() => {
                  playSound();
                  handleNavigation('profile');
                }}>
                Mon compte
              </button>

              <button className="settings-buttons"
                onClick={() => {
                  playSound();
                  handleNavigation('rewards');
                }}>
                Badges
              </button>

              <button className="settings-buttons"
                onClick={() => {
                  playSound();
                  handleLogout();
                }}>
                Se déconnecter
              </button>

            </div>
          </div>
        )}

        {currentView === 'profile' && <ProfileModal onBackToSettings={handleBackToSettings} />}

      </div>
    </div>
  );
};

export default SettingsModal;
