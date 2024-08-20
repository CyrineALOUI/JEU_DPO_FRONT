import React from 'react';
import './EditProfile.css';

const EditProfile = ({ onBack }) => (
  <div className="settings-body">
    <h1>Editer Profil</h1>

    <div class="coolinput">
      <label class="text" for="input">Nom</label>
      <input class="input" name="input" type="text" />

      <label class="text" for="input">Prénom</label>
      <input class="input" name="input" type="text" />

      <label class="text" for="input">Email</label>
      <input class="input" name="input" type="text" />
    </div>
    <button className="save-button" >Sauvegarder</button>
  </div>
);

export default EditProfile;
