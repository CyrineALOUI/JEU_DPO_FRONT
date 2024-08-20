import React, { useState } from 'react';
import './EditProfile.css';
import playerService from '../../../../services/PlayerService';

const EditProfile = ({ playerId, onBack }) => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await playerService.updateProfile(playerId, firstName, lastName, email);
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="settings-body">
      <h1>Editer Profil</h1>

      <div class="coolinput">
        <label class="text" for="input">Nom</label>
        <input class="input" name="input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

        <label class="text" for="input">Prénom</label>
        <input class="input" name="input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

        <label class="text" for="input">Email</label>
        <input class="input" name="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <button className="save-button" type="submit">Sauvegarder</button>
    </div>
    </form>
  );
};

export default EditProfile;
