import React from 'react';
import './Play.css';
import { Link } from 'react-router-dom';

const Play = () => {

    return (
        <div className="Play-Container">
            <Link to="/map" className="Play-Button">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Jouer
            </Link>
        </div>
    );
};

export default Play;
