import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';
import ForgotPasswordModal from './ForgotPassword/ForgotPasswordModal';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleCloseModal = ()  => {
    setShowForgotPasswordModal(false);
  };

  return (
    <div className="auth-container">
      <div className="centered-container">
        <div className={`container ${isLogin ? '' : 'right__panel__active'}`} id="container">
          <div className="form__container signup__container">
            <RegisterForm toggleForm={toggleForm} />
          </div>
          <div className="form__container signin__container">
            <LoginForm toggleForm={toggleForm} onForgotPasswordClick={() => setShowForgotPasswordModal(true)} />
          </div>
          <div className="overlay__container" id="overlayContainer">
            <div className="overlay__wrapper">
              <div className="overlay__panel overlay__panel__left">
                <p>Prêt à protéger vos données ?  Connectez-vous pour rejoindre l'action !</p>
                <p></p>
                <button onClick={toggleForm}>Se Connecter</button>
              </div>
              <div className="overlay__panel overlay__panel__right">
                <p>Pas encore de compte ?</p>
                <p>Rejoignez-nous dès maintenant !</p>
                <button onClick={toggleForm}>Créer Un Compte</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForgotPasswordModal && (
        <ForgotPasswordModal show={showForgotPasswordModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Auth;
