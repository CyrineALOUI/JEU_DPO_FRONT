import React, { useState, useEffect, useRef } from 'react';
import scenarioGameService from '../../../services/ScenarioGameService';
import badgeService from '../../../services/BadgeService';
import { useScore } from '../../GameHeader/Score/ScoreContext';
import { useParams, useNavigate } from 'react-router-dom';
import GameHeader from '../../GameHeader/GameHeader';
import GameControl from '../../GameControl/GameControl';
import { toast } from 'react-toastify';
import './ScenarioGame.css';
import BonusModal from '../../Levels/BonusModal/BonusModal';

const ScenarioGame = () => {
  const { id: scenarioId } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [selectedOptionsByText, setSelectedOptionsByText] = useState(new Map());
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [hasValidated, setHasValidated] = useState(false);
  const [totalScore, setTotalScore] = useState(0); 
  const [showModal, setShowModal] = useState(false);
  const badgeUnlockCalled = useRef(false);
  const { updateScore } = useScore();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const data = await scenarioGameService.getScenarioGameById(scenarioId);
        setScenario(data);
      } catch {
        toast.error('Impossible de charger les détails du jeu de scénario');
      }
    };

    fetchScenario();
  }, [scenarioId]);

  const handleCheckboxChange = (optionId) => {
    setSelectedOptionsByText((prev) => {
      const newSelectedOptions = new Map(prev);
      const currentSelected = newSelectedOptions.get(currentScenarioIndex) || [];

      if (currentSelected.includes(optionId)) {
        newSelectedOptions.set(
          currentScenarioIndex,
          currentSelected.filter((id) => id !== optionId)
        );
      } else {
        newSelectedOptions.set(currentScenarioIndex, [...currentSelected, optionId]);
      }

      return newSelectedOptions;
    });
  };

  const areAllTextsCorrect = () => {
    return scenario.scenarioTexts.every((text, index) => {
      const correctOptionIds = text.options
        .filter((option) => option.correct)
        .map((option) => option.id);

      const selectedOptionIds = selectedOptionsByText.get(index) || [];
      return (
        selectedOptionIds.length === correctOptionIds.length &&
        correctOptionIds.every((id) => selectedOptionIds.includes(id))
      );
    });
  };

  const handleSubmit = async () => {
    setHasValidated(true);

    try {
      const currentScenario = scenario.scenarioTexts[currentScenarioIndex];
      const correctOptions = currentScenario.options.filter((option) => option.correct);
      const correctSelections = (selectedOptionsByText.get(currentScenarioIndex) || []).filter((optionId) =>
        correctOptions.some((option) => option.id === Number(optionId))
      );
    
      const scoreForCurrentScenario = correctSelections.length * 50;
      setTotalScore((prevScore) => prevScore + scoreForCurrentScenario);

      if (currentScenarioIndex === scenario.scenarioTexts.length - 1) {
        const allCorrect = areAllTextsCorrect();
        handleScenarioCompletion(allCorrect);
      }

      setTimeout(() => {
        if (currentScenarioIndex < scenario.scenarioTexts.length - 1) {
          setCurrentScenarioIndex((prevIndex) => prevIndex + 1);
          setHasValidated(false);
        }
      }, 2000);
    } catch {
      toast.error("Erreur lors de la validation des réponses");
    }
  };

  const handleScenarioCompletion = async (isCorrect) => {
    if (isCorrect && scenarioId && !badgeUnlockCalled.current) {
      badgeUnlockCalled.current = true;
      try {
        const response = await badgeService.unlockBadgeForScenario(scenarioId);
        if (response?.data === "Badge successfully unlocked for Scenario level.") {
          toast.success("Bravo !🎉 Vous avez débloqué un nouveau badge !");
        }
      } catch {
        toast.error("Une erreur est survenue lors du déblocage du badge.");
      }
    }

    setShowModal(true);
  };

  const handleIgnoreLevel = () => {
    navigate('/map');
  };

  const handleConfirmScore = async () => {
    try {
        await scenarioGameService.saveScenarioScore(scenarioId, totalScore);
        updateScore((prevScore) => prevScore + totalScore);
        navigate('/map');
    } catch (error) {
        toast.error("Erreur lors de l'enregistrement du score");
    }
};


  if (!scenario) {
    return <div className="loading-message">Chargement...</div>;
  }

  const currentScenarioText = scenario.scenarioTexts[currentScenarioIndex];
  const correctOptions = currentScenarioText.options.filter((option) => option.correct);

  return (
    <div className="Map-Container">
      <GameHeader />
      <GameControl isPaused={isPaused} setIsPaused={setIsPaused} />
      <div className="glass-box-scenario">
        <h1 className="scenario-title">{currentScenarioText.scenarioTitle}</h1>
        <p className="scenario-text">{currentScenarioText.scenarioText}</p>
        <p className="instruction-text">Choisissez une ou plusieurs options :</p>
        <div className="options-container">
          <div className="options-list">
            {currentScenarioText.options.map((option) => {
              const isSelected = (selectedOptionsByText.get(currentScenarioIndex) || []).includes(option.id);
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
            disabled={!(selectedOptionsByText.get(currentScenarioIndex)?.length) || hasValidated}
          >
            Valider
          </button>
          <button className="button-text" onClick={handleIgnoreLevel}>
            Ignorer Ce Niveau
          </button>
        </div>
      </div>

      {showModal && (
        <BonusModal totalScore={totalScore} onConfirm={handleConfirmScore} scenarioId={scenarioId} />
      )}
    </div>
  );
};

export default ScenarioGame;
