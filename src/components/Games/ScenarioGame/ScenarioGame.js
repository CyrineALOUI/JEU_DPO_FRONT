import React, { useState, useEffect } from 'react';
import scenarioGameService from '../../../services/ScenarioGameService';
import { useScore } from '../../GameHeader/Score/ScoreContext';
import { useParams, useNavigate } from 'react-router-dom';
import GameHeader from '../../GameHeader/GameHeader';
import './ScenarioGame.css';

const ScenarioGame = () => {
  const { id: scenarioId } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [hasValidated, setHasValidated] = useState(false);
  const { score, updateScore } = useScore();

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const data = await scenarioGameService.getScenarioGameById(scenarioId);
        setScenario(data);
      } catch (error) {
        setError('Impossible de charger les détails du jeu de scénario');
      }
    };

    fetchScenario();
  }, [scenarioId]);

  const handleCheckboxChange = (optionId) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(optionId)) {
        return prevSelected.filter((id) => id !== optionId);
      } else {
        return [...prevSelected, optionId];
      }
    });
  };

  const handleSubmit = async () => {
    setHasValidated(true);
    try {
      const response = await scenarioGameService.verifyAnswerScenario(
        scenarioId,
        scenario.scenarioTexts[currentScenarioIndex].id,
        selectedOptions
      );

      if (response.isCorrect) {
        updateScore(score + 50);
      }

      setTimeout(() => {
        if (currentScenarioIndex < scenario.scenarioTexts.length - 1) {
          setCurrentScenarioIndex(currentScenarioIndex + 1);
          setSelectedOptions([]);
          setHasValidated(false);
        } else {
          navigate('/map');
        }
      }, 2000);
    } catch (error) {
      console.error('Error verifying answers:', error);
      setError('Erreur lors de la validation des réponses');
    }
  };

  const handleIgnoreLevel = () => {
    navigate('/map');
  };

  if (!scenario) {
    return <div className="loading-message">Chargement...</div>;
  }

  const currentScenarioText = scenario.scenarioTexts[currentScenarioIndex];
  const correctOptions = currentScenarioText.options.filter((option) => option.correct);

  return (
    <div className="Map-Container">
      <GameHeader />
      <div className="glass-box-scenario">
        <h1 className="scenario-title">{currentScenarioText.scenarioTitle}</h1>
        <p className="scenario-text">{currentScenarioText.scenarioText}</p>
        <p className="instruction-text">Choisissez une ou plusieurs options :</p>
        <div className="options-container">
          <div className="options-list">
            {currentScenarioText.options &&
              currentScenarioText.options.length > 0 &&
              currentScenarioText.options.map((option) => {
                const isSelected = selectedOptions.includes(option.id);
                const isCorrect = correctOptions.some((correct) => correct.id === option.id);

                return (
                  <div key={option.id} className="checkbox-wrapper-46">
                    <input
                      type="checkbox"
                      id={`option-${option.id}`}
                      className="inp-cbx"
                      onChange={() => handleCheckboxChange(option.id)}
                      checked={isSelected}
                      disabled={hasValidated}
                    />
                    <label
                      htmlFor={`option-${option.id}`}
                      className={`cbx ${hasValidated && isSelected
                        ? isCorrect
                          ? 'text-correct'
                          : 'text-incorrect'
                        : ''
                        }`}
                    >
                      <span>
                        <svg viewBox="0 0 12 10" height="10px" width="12px">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <span>{option.optionText}</span>
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="button-group">
          <button
            className="button-text"
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0 || hasValidated}
          >
            Valider
          </button>
          <button
            className="button-text"
            onClick={handleIgnoreLevel}
          >
            Ignorer Ce Niveau
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioGame;
