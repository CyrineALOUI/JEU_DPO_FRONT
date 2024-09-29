import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';
import ForgotPasswordModal from './ForgotPassword/ForgotPasswordModal';
import ActivateAccountModal from './ActivateAccount/ActivateAccountModal';
import playerService from '../../../services/PlayerService';
import { toast } from 'react-toastify';
import logo from '../../../assets/Pictures/logo.png'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showActivateAccountModal, setShowActivateAccountModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleActivateAccount = async (email) => {
    try {
      if (!email || typeof email !== 'string') {
        console.error('Format de l’email invalide');
        toast.error("L'email fourni est invalide.", {
          position: 'top-right',
          autoClose: 5000,
        });
        return;
      }
      await playerService.sendReactivationEmail(email);
      toast.success("Un e-mail de réactivation de votre compte a été envoyé avec succès.", {
        position: 'top-right',
        autoClose: 5000,
      });
      setShowActivateAccountModal(true);
      setEmail('');
    } catch (error) {
      console.error("Échec de l’envoi de l’e-mail de réactivation.", error);
      toast.error("Une erreur est survenue lors de l'envoi de l'e-mail de réactivation.", {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleCloseModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleCloseActivateModal = () => {
    setShowActivateAccountModal(false);
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Game Logo" className="logo-image-auth" />
      <div className="centered-container">
        <div className={`container ${isLogin ? '' : 'right__panel__active'}`} id="container">
          <div className="form__container signup__container">
            <RegisterForm toggleForm={toggleForm} />
          </div>
          <div className="form__container signin__container">
            <LoginForm
              onForgotPasswordClick={() => setShowForgotPasswordModal(true)}
              onActivateAccountClick={(email) => handleActivateAccount(email)}
            />
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

      {showActivateAccountModal && (
        <ActivateAccountModal show={showActivateAccountModal} onClose={handleCloseActivateModal} email={email} />
      )}

    </div>
  );
};

export default Auth;
