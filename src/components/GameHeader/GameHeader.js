import React from 'react';
//import './GameHeader.css'; 

const GameHeader = ({ avatar, hearts, points, sound }) => {
  return (
    <div className="game-header">
      <div className="avatar">{avatar}</div>
      <div className="hearts">{hearts}</div>
      <div className="points">{points}</div>
    </div>
  );
};

export default GameHeader;
