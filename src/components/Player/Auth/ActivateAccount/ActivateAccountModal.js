import React, { useState, useEffect } from 'react';
import './ActivateAccountModal.css';
import { toast } from 'react-toastify';
import playerService from '../../../../services/PlayerService';

const ActivateAccountModal = ({ show, onClose }) => {
  const [codeInputs, setCodeInputs] = useState(['', '', '', '']); 
  const [timeRemaining, setTimeRemaining] = useState(900); //Minuteur 15 minutes

  const handleClose = () => {
    onClose();
  };

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newCodeInputs = [...codeInputs];
      newCodeInputs[index] = value;
      setCodeInputs(newCodeInputs);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const verificationCode = codeInputs.join(''); 

    if (verificationCode.length !== 4) {
      toast.error("Veuillez entrer un code de 4 chiffres.", {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    try {
      await playerService.reactivateAccount(verificationCode);
      toast.success("Votre compte a été réactivé avec succès !", {
        position: 'top-right',
        autoClose: 5000,
      });
      handleClose();
    } catch (error) {
      toast.error("Code de réactivation invalide ou expiré.", {
        position: 'top-right',
        autoClose: 5000,
      });
      console.error('Failed to verify reactivation code:', error);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setCodeInputs(['', '', '', '']);
  };

  useEffect(() => {
    if (!show) return; 

    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer); 
          toast.error("Le code d'activation a expiré.", {
            position: 'top-right',
            autoClose: 5000,
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  if (!show) return null;

  return (
    <div className="activate-account-modal">
      <div className="activate-account-content">
        <button className="exit-button-activate" onClick={handleClose}>
          &times;
        </button>
        <h2>Activez votre Compte</h2>
        <p>Un e-mail contenant votre code d'activation de compte a été envoyé. Veuillez vérifier votre boîte de réception pour finaliser cette étape.</p>
        <div className="countdown-timer">{formattedTime}</div>
        <form className="activate-form" onSubmit={handleVerifyCode}>
          <div className="input-fields">
            {codeInputs.map((code, index) => (
              <input
                key={index}
                type="tel"
                maxLength="1"
                value={code}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="action-btns">
            <button className="button-activate" type="submit">
              Vérifier <span></span>
            </button>
            <button className="button-clear" onClick={handleClear}>
              Effacer <span></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivateAccountModal;
