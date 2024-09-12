import React, { useEffect, useState } from 'react';
import "./EditProfile.css"
import playerService from '../../../../services/PlayerService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success('Profil mis à jour avec succès !', {
        position: 'top-right',
        autoClose: 5000, 
      });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="settings-body">
        <div className="edit-profile-title">
          <h1>Editer Profil</h1>

          <div className="edit-profile-input">
          <label>Nom</label>
            <input
              className="input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label>Prénom</label>
            <input
              className="input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              className="input"
              type="email"
              placeholder="Prénom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />

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
