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

              <input className="input-btn" type="radio" id="valueIs-1" name="valueIs-radio" value="valueIs-1" />
              <label className="neon-btn"
                onClick={() => {
                  playSound();
                  handleNavigation('profile');
                }}>
                <span className="span"></span>
                <span className="txt">Mon Compte</span>
              </label>

              <input className="input-btn" type="radio" id="valueIs-2" name="valueIs-radio" value="valueIs-2" />
              <label className="neon-btn"
                onClick={() => {
                  playSound();
                  handleNavigation('rewards');
                }}>
                <span className="span"></span>
                <span className="txt">Récompenses</span>
              </label>

              <input className="input-btn" type="radio" id="valueIs-2" name="valueIs-radio" value="valueIs-2" />
              <label className="neon-btn"
                onClick={() => {
                  playSound();
                  handleLogout();
                }}>
                <span className="span"></span>
                <span className="txt">Se déconnecter</span>
              </label>

            </div>
          </div>
        )}

        {currentView === 'profile' && <ProfileModal onBackToSettings={handleBackToSettings} />}

      </div>
    </div>
  );
};

export default SettingsModal;
