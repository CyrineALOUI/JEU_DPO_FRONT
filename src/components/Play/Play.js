import React, { useState } from 'react';
import './Play.css';
import { useNavigate } from 'react-router-dom';

const Play = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePlayClick = () => {
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
