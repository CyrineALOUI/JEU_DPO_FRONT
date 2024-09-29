import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../../../services/QuizService';
import QuestionTimer from './QuizChrono/QuestionTimer';
import GameHeader from '../../GameHeader/GameHeader';
import { MdDoubleArrow } from "react-icons/md";
import clickSound from '../../../assets/Sound/click-sound.wav';
import correctSound from '../../../assets/Sound/correct-sound.mp3';
import incorrectSound from '../../../assets/Sound/incorrect-sound.mp3';
import { playClickSound, textAudios } from '../../Utils/SoundUtils';
import { useScore } from '../../GameHeader/Score/ScoreContext';
import Hint from '../../Hint/Hint';
import "./Quiz.css";

const Quiz = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersStatus, setAnswersStatus] = useState({});
  const { score, updateScore } = useScore();
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(new Audio(textAudios[quizId]));
  const [karaokeText, setKaraokeText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await quizService.getQuizById(quizId);
        setQuiz(data);
        if (data.introductionText) {
          setKaraokeText(data.introductionText.replace(/\s+/g, ' ').trim());
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const playSound = () => {
    playClickSound(clickSound);
  };

  const handleRadioChange = (answerId) => {
    playSound();
    setSelectedAnswer(answerId);
    setIsButtonDisabled(false);
  };

  const handleSubmit = async () => {
    try {
      const isCorrect = await quizService.verifyAnswers([selectedAnswer]);
      const newAnswersStatus = {
        [selectedAnswer]: isCorrect ? 'correct' : 'incorrect',
      };
      setAnswersStatus(newAnswersStatus);

      if (isCorrect) {
        updateScore(score + 50);
      }

      const verifyAnswerSound = isCorrect ? correctSound : incorrectSound;
      playClickSound(verifyAnswerSound);

      // Passe à la question suivante après un délai
      setTimeout(() => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsButtonDisabled(true);
          setAnswersStatus({});
        } else {
          alert(`Quiz terminé`);
        }
      }, 2000);
    } catch (error) {
      console.error('Error verifying answers:', error);
    }
  };

  const handleTimeUp = () => {
    console.log('Temps écoulé!');
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsButtonDisabled(true);
      setAnswersStatus({});
    } else {
      alert('Quiz terminé');
    }
  };

  const handleStartQuiz = () => {
    setShowIntroduction(false);
    //Arreter l'audio
    audioRef.current.pause();
    setIsAudioPlaying(false);
  };

  const handlePlayAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    let interval;

    if (isAudioPlaying) {
      const durationPerLetter = audioRef.current.duration / karaokeText.length;
      interval = setInterval(() => {
        const currentTime = audioRef.current.currentTime;
        const newHighlightedIndex = Math.floor(currentTime / durationPerLetter);

        if (newHighlightedIndex < karaokeText.length) {
          setHighlightedIndex(newHighlightedIndex);
        } else {
          clearInterval(interval);
        }
      }, 100);
    }

    const audio = audioRef.current;
    audio.addEventListener('ended', () => {
      setIsAudioPlaying(false);
    });

    return () => clearInterval(interval);
  }, [isAudioPlaying, karaokeText]);

  const renderKaraokeText = () => {
    let totalLetters = 0;
  
    return (
      <div>
        {karaokeText.split('.').map((sentence, index) => {
          const startIndex = totalLetters;
          totalLetters += sentence.length;
  
          return (
            <p key={index}>
              {sentence.split('').map((letter, letterIndex) => {
                const globalIndex = startIndex + letterIndex;
                return (
                  <span
                    key={letterIndex}
                    className={globalIndex <= highlightedIndex ? 'highlighted' : 'unhighlighted'}
                  >
                    {letter}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
    );
  };
  


  if (!quiz) {
    return <div>Chargement...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="Map-Container">
      <GameHeader />
      <div className="glass-box-quiz">
        <div className="text-content">
          {showIntroduction ? (
            <div className="text-container">
              <h2>{quiz.titleText}</h2>
              <div>{renderKaraokeText()}</div>
              <div className="button-group">
                <button className="button-text" onClick={handleStartQuiz}>
                  Commencez le Quiz
                </button>
                <button className="button-text" onClick={handlePlayAudio}>
                  {isAudioPlaying ? "Pause" : "Lire"}
                </button>
              </div>
            </div>
          ) : (
            <div key={currentQuestion.id} className="question-container">
              <h3 className="question-text">{currentQuestion.questionText}</h3>
              <h4>
                <MdDoubleArrow /> Sélectionnez le bon choix puis soumettez votre
                réponse.
              </h4>
              <QuestionTimer duration={currentQuestion.duration} onTimeUp={handleTimeUp} />
              <Hint />

              <ul className="answer-list">
                {currentQuestion.answers.map((answer) => (
                  <li key={answer.id}>
                    <label className={`label-container ${answersStatus[answer.id]}`}>
                      <input
                        type="radio"
                        name="answer"
                        onChange={() => handleRadioChange(answer.id)}
                        checked={selectedAnswer === answer.id}
                        disabled={!!answersStatus[answer.id]}
                      />
                      <div className="checkmark">
                        <div className="answer-text">{answer.answerText}</div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
              <br />
              <br />
              <button
                className="button-quiz"
                type="button"
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Répondre
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
