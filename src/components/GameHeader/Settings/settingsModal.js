import React from 'react';
import './SettingsModal.css';

const SettingsModal = ({ show, onClose }) => {

  if (!show) {
    return null;
  }

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <button className="exit-button" onClick={onClose}>
          &times;
        </button>
        <div className="settings-body">
          <h1>Paramètres</h1>

          <div class="settings-container">

            <input class="input-btn" type="radio" id="valueIs-1" name="valueIs-radio" value="valueIs-1" />
            <label class="neon-btn" for="valueIs-1">
              <span class="span"></span>
              <span class="txt">Mon Profil</span>
            </label>

            <input class="input-btn" type="radio" id="valueIs-2" name="valueIs-radio" value="valueIs-2" />
            <label class="neon-btn" for="valueIs-2">
              <span class="span"></span>
              <span class="txt">Récompenses</span>
            </label>
          </div>




        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
