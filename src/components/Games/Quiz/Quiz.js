import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizService from '../../../services/QuizService';
import QuestionTimer from './QuizChrono/QuestionTimer';
import GameHeader from '../../GameHeader/GameHeader';
import correctSound from '../../../assets/Sound/correct-sound.mp3';
import incorrectSound from '../../../assets/Sound/incorrect-sound.mp3';
import { textAudios } from '../../Utils/SoundUtils';
import { useScore } from '../../GameHeader/Score/ScoreContext';
import "./Quiz.css";
import questionImage from '../../../assets/Pictures/question.png';
import GameControl from '../../GameControl/GameControl';
import SuccessLevelModal from '../../Levels/SuccessLevel/SuccessLevelModal';
import FailureLevelModal from '../../Levels/FailureLevel/FailureLevelModal';

const Quiz = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersStatus, setAnswersStatus] = useState({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const { score, updateScore } = useScore();
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(new Audio(textAudios[quizId]));
  const [karaokeText, setKaraokeText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const correctAudioRef = useRef(new Audio(correctSound));
  const incorrectAudioRef = useRef(new Audio(incorrectSound));
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

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

  const handleAnswerSubmit = async (answer) => {
    setSelectedAnswer(answer);
    const answerKey = answer ? 'yes' : 'no';

    let newCorrectAnswersCount = correctAnswersCount;

    try {
      const response = await quizService.verifyAnswer(currentQuestion.id, answer ? 'oui' : 'non');
      const isCorrect = response === "Correct answer!";
      setAnswersStatus({ [answerKey]: isCorrect ? 'correct' : 'incorrect' });

      if (isCorrect) {
        updateScore(score + 50);
        newCorrectAnswersCount += 1;
        correctAudioRef.current.play();
      } else {
        incorrectAudioRef.current.play();
      }

      setTimeout(() => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setSelectedAnswer(null);
          setAnswersStatus({});
          setCorrectAnswersCount(newCorrectAnswersCount);
        } else {
          handleSubmitQuiz(newCorrectAnswersCount);
        }
      }, 2000);
    } catch (error) {
      console.error('Error verifying answers:', error);
    }
  };

  const handleSubmitQuiz = async (finalCorrectAnswersCount) => {
    try {
      const result = await quizService.submitQuiz(quizId, finalCorrectAnswersCount);
      if (result.status === "success") {
        setShowSuccessModal(true);
      } else if (result.status === "failure") {
        setShowFailureModal(true);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setShowFailureModal(false);
    navigate('/map');
  };

  /*const handleTimeUp = () => {
    console.log('Temps écoulé!');
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswersStatus({});
    } else {
      navigate('/map');
    }
  };*/

  const handleStartQuiz = () => {
    setShowIntroduction(false);
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
      <GameControl isPaused={isPaused} setIsPaused={setIsPaused} />
      <div className="glass-box-quiz">
        {!showIntroduction && (
          <div className="question-image">
            <img src={questionImage} alt="question-icon" />
          </div>
        )}
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
              <h3 className="question-title">{currentQuestion.questionTitle}</h3>
              <h4 className="answer-style">{currentQuestion.answer}</h4>

              <QuestionTimer
                duration={currentQuestion.duration}
                /*onTimeUp={handleTimeUp}*/
                isPaused={isPaused}
              />

              <div className="answer-list">
                <button
                  className={`button-quiz ${selectedAnswer === true ? (answersStatus.yes === 'correct' ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerSubmit(true)}
                >
                  Oui
                </button>
                <button
                  className={`button-quiz ${selectedAnswer === false ? (answersStatus.no === 'correct' ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerSubmit(false)}
                >
                  Non
                </button>
              </div>
              <br />
              <br />
            </div>
          )}
        </div>
      </div>

      {showSuccessModal && <SuccessLevelModal onClose={closeModal} levelId={quizId} />}
      {showFailureModal && <FailureLevelModal onClose={closeModal} />}

    </div>
  );
};

export default Quiz;
