import React, { useEffect, useState } from 'react';
import './Play.css';
import { useNavigate } from 'react-router-dom';
import logoPlay from '../../assets/Pictures/logo.png';

const Play = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [logoVisible, setLogoVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 2000);

        const redirectTimer = setTimeout(() => {
            navigate('/map');
        }, 6000);

        return () => {
            clearTimeout(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <div className="Play-Container">
            <div className="play-image">
                <img src={logoPlay} alt="logo" />
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
