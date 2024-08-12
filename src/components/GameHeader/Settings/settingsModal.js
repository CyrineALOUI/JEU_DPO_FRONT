import React from 'react';
import './SettingsModal.css';

const SettingsModal = ({ show, onClose }) => {

    if (!show) {
        return null;
    }

    return (
        <div className="settings-modal">
          <div className="settings-content">
            <button className="exit-button" onClick={onClose}>
              &times;
            </button>
            <div className="settings-body">           
            </div>  
          </div>
        </div>
      );
    };

export default SettingsModal;
