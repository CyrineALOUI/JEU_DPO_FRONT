import React, { useEffect, useState } from 'react';
import "./EditProfile.css"
import playerService from '../../../../services/PlayerService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from "react-icons/fa";

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
      console.error('Échec de la mise à jour du profil:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="settings-body">
        <button class="return-button" onClick={onBack}><FaArrowLeft /></button>
          <div class="form-title-profile"><h1>Editer Profil</h1></div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div>
            <button className="save-button" type="submit">Sauvegarder</button>
          </div>
      </div>
    </form>
  );
};

export default EditProfile;
