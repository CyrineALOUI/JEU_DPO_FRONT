import React from 'react';

const ProfileModal = ({ onBack }) => (
  <div className="settings-body">
    <h1>Mon Profil</h1>
    <button onClick={onBack}>Retour aux Paramètres</button>

    <div className="settings-container">

              <input className="input-btn" type="radio" id="valueIs-1" name="valueIs-radio" value="valueIs-1" />
              <label className="neon-btn" >
                <span className="span"></span>
                <span className="txt">données</span>
              </label>

              </div>
  </div>
);

export default ProfileModal;
 