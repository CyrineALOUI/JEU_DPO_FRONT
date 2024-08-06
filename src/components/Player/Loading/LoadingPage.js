// LoadingPage.js
import React, { useEffect, useState } from 'react';
import './LoadingPage.css'; // Importez le fichier CSS

const LoadingPage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          onLoadingComplete();
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <p id="progress-text">Loading....<span>{progress.toFixed(0)}%</span></p>
    </div>
  );
};

export default LoadingPage;
