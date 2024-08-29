import React, { createContext, useContext, useState, useEffect } from 'react';
import playerService from '../../../services/PlayerService';


const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const data = await playerService.getPlayerData();
        setScore(data.score);
      } catch (err) {
        console.error('Erreur lors de la récupération des données du joueur:', err);
      }
    };

    fetchPlayerData();
  }, []);

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <ScoreContext.Provider value={{ score, updateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
