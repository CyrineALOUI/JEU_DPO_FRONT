import React, { createContext, useState, useEffect, useCallback } from 'react';
import playerService from '../../../services/PlayerService';

export const LifeTimerContext = createContext();

export const LifeTimerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(null);
  const [totalTimer, setTotalTimer] = useState(0);

  const fetchPlayerData = useCallback(async () => {
    try {
      const data = await playerService.getPlayerData();
      if (data) {
        setPlayerData(data);
        if (data.livesRecoveryTimers && Array.isArray(data.livesRecoveryTimers)) {
          initializeTotalTimer(data.livesRecoveryTimers);
        }
      }
    } catch (err) {
      console.error('Error fetching player data:', err);
    }
  }, []);

  const initializeTotalTimer = (recoveryTimers) => {
    if (recoveryTimers && recoveryTimers.length > 0) {
      const nextTimer = new Date(recoveryTimers[0]) - new Date();
      setTotalTimer(nextTimer > 0 ? nextTimer : 0);
    } else {
      setTotalTimer(0);
    }
  };

  const recoverLife = useCallback(async () => {
    try {
      if (playerData.lives >= 5) {
        console.log('Player already has maximum lives (5)');
        return;
      }

      const updatedData = await playerService.recoverLife();
      console.log('Updated player data after life recovery:', updatedData);

      if (updatedData && updatedData.livesRecoveryTimers) {
        setPlayerData(updatedData);
        initializeTotalTimer(updatedData.livesRecoveryTimers);
      } else {
        console.warn('Invalid data received for player after recovering life');
      }
      fetchPlayerData();

    } catch (error) {
      console.error('Failed to recover life:', error.response ? error.response.data : error);
    }
  }, [playerData, fetchPlayerData]);

  useEffect(() => {
    fetchPlayerData();
  }, [fetchPlayerData]);

  useEffect(() => {
    if (!playerData || playerData.lives >= 5) {
      return;
    }

    const interval = setInterval(() => {
      setTotalTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1000;
        } else {
          recoverLife();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalTimer, playerData, recoverLife]);

  return (
    <LifeTimerContext.Provider value={{ playerData, totalTimer, fetchPlayerData }}>
      {children}
    </LifeTimerContext.Provider>
  );
};
