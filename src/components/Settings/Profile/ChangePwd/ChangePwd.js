import React from 'react';
import './ChangePwd.css';

const ChangePwd = () => {


    return (
        <form >
            <div className="settings-body">
                <div className="settings-title">
                    <h1>Changer Mot De Passe</h1>

                    <div className="coolinput">
                        <label className="text" htmlFor="firstName">Ancien Mot de Passe</label>
                        <input className="input" type="text" id="firstName" />

                        <label className="text" htmlFor="lastName">Nouveau Mot de Passe</label>
                        <input className="input" type="text" id="lastName" />

                        <label className="text" htmlFor="lastName">Confirmer Mot de Passe</label>
                        <input className="input" type="text" id="lastName" />
                    </div>
                    <button className="save-button" type="submit">Sauvegarder</button>
                </div>
            </div>
        </form>
    );
};

export default ChangePwd;
