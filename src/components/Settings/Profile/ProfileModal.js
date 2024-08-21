import React, { useState } from 'react';
import EditProfile from './EditProfile/EditProfile';
import ChangePwd from './ChangePwd/ChangePwd';


const ProfileModal = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('profile_main');

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('profile_main');
  };

  return (

    <div>
      {currentView === 'profile_main' && (
        <div className="settings-body">
          <h1>Mon Compte</h1>
          <div className="settings-container">

            <input className="input-btn" type="radio" id="valueIs-1" name="valueIs-radio" value="valueIs-1" />
            <label className="neon-btn" onClick={() => handleNavigation('edit_profile')}>
              <span className="span"></span>
              <span className="txt">Editer Profil</span>
            </label>

            <input className="input-btn" type="radio" id="valueIs-1" name="valueIs-radio" value="valueIs-1" />
            <label className="neon-btn" onClick={() => handleNavigation('change_pwd')}>
              <span className="span"></span>
              <span className="txt">Changer Mot de Passe</span>
            </label>

          </div>
        </div>
      )}

      {currentView === 'edit_profile' && <EditProfile onBack={handleBack} />}
      {currentView === 'change_pwd' && <ChangePwd onBack={handleBack} />}

    </div>

  );
};

export default ProfileModal;
