import React, { useEffect, useState } from 'react';
import "./QuestionTimer.css";

const QuestionTimer = ({ duration, onTimeUp, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }

    if (isPaused) return; 

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isPaused]);

  const getBackgroundColor = () => {
    if (timeLeft > duration / 2) return "green";
    if (timeLeft > 5) return "orange";
    return "red";
  };

  return (
    <div className="timer-container">
      <div className="timer" style={{ backgroundColor: getBackgroundColor() }}>
        <div className="numbers">
          {timeLeft}
        </div>
      </div>
    </div>

  );
};

export default QuestionTimer;