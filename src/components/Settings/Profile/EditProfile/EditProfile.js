import React, { useEffect, useState } from 'react';
import "./EditProfile.css"
import playerService from '../../../../services/PlayerService';

const EditProfile = ({ playerId, onBack }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const playerData = await playerService.getPlayerData();
        setFirstName(playerData.firstName);
        setLastName(playerData.lastName);
        setEmail(playerData.email);
      } catch (error) {
        console.error('Failed to fetch player data:', error);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await playerService.updateProfile(firstName, lastName, email);
      //onBack(); 
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="settings-body">
        <div className="settings-title">
          <h1>Editer Profil</h1>

          <div className="coolinput">

            <label className="text" htmlFor="firstName">Nom</label>
            <input className="input" type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label className="text" htmlFor="lastName">Prénom</label>
            <input className="input" type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <label className="text" htmlFor="email">Email</label>
            <input className="input" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
          </div>
          <div>
          <button className="save-button" type="submit">Sauvegarder</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
