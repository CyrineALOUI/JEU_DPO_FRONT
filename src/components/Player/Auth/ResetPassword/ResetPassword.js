import React from 'react';
import passwordImage from '../../../../assets/Pictures/password.png';
import './ResetPassword.css';

const ResetPassword = () => {

    return (
        <div className="password-container">
            <div className="reset-password-content">
                <div className="password-image">
                    <img src={passwordImage} alt="passwordImage" />
                </div>
                <h2>Réinitialiser votre Mot de Passe</h2>
                <br />
                <br />
                <div className="password-input">
                    <label className="text" htmlFor="newPassword">Nouveau Mot de Passe</label>
                    <input className="input" type="password" id="newPassword" required />

                    <label className="text" htmlFor="confirmNewPassword">Confirmer Mot de Passe</label>
                    <input className="input" type="password" id="confirmNewPassword" required />
                </div>
                <button className="save-button" type="submit">Sauvegarder</button>
            </div>
        </div>
    );
};

export default ResetPassword;
