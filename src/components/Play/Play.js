import React, { useState } from 'react';
import './Play.css';
import { useNavigate } from 'react-router-dom';
import { playClickSound } from '../Utils/SoundUtils';
import clickSound from '../../assets/Sound/click-sound.wav'

const Play = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const playSound = () => {
        playClickSound(clickSound);
    };

    const handlePlayClick = () => {
        playSound();
        setLoading(true);
        setTimeout(() => {
            navigate('/map');
        }, 4000);
    };

    return (
        <div className="Play-Container">
            <div className="Play-Button" onClick={handlePlayClick}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Jouer
            </div>
            {loading && (
                <div className="loader">
                    <div className="scanner">
                        <span>Chargement...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Play;
