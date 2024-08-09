import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../../../services/QuizService';
import QuestionTimer from './QuizChrono/QuestionTimer';
import './Quiz.css';

const Quiz = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState(new Set());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersStatus, setAnswersStatus] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await quizService.getQuizById(quizId);
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const handleCheckboxChange = (answerId) => {
    setSelectedAnswers((selectedAnswers) => {
      const newSelectedAnswers = new Set(selectedAnswers);
      if (newSelectedAnswers.has(answerId)) {
        newSelectedAnswers.delete(answerId);
      } else {
        newSelectedAnswers.add(answerId);
      }
      setIsButtonDisabled(newSelectedAnswers.size === 0);
      return newSelectedAnswers;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await quizService.verifyAnswers(Array.from(selectedAnswers));
      console.log('Response from verifyAnswers:', response); // Affichez la réponse pour vérifier

      const newAnswersStatus = {};
      Array.from(selectedAnswers).forEach((answerId) => {
        newAnswersStatus[answerId] = response ? 'correct' : 'incorrect';
      });
      setAnswersStatus(newAnswersStatus);

      // Passe à la question suivante après un délai
      setTimeout(() => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswers(new Set());
          setIsButtonDisabled(true);
          setAnswersStatus({});
        } else {
          alert('Quiz terminé !');
        }
      }, 2000); // Change question after 2 seconds
    } catch (error) {
      console.error('Error verifying answers:', error);
    }
  };

  const handleTimeUp = () => {
    console.log('Temps écoulé!');
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers(new Set());
      setIsButtonDisabled(true);
      setAnswersStatus({});
    } else {
      alert('Quiz terminé !');
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <div key={currentQuestion.id} className="question-container">
          <h3 className="question-text">{currentQuestion.questionText}</h3>

          <QuestionTimer 
            duration={currentQuestion.duration} 
            onTimeUp={handleTimeUp} 
          />
          
          <ul className="answer-list">
            {currentQuestion.answers.map((answer) => (
              <li key={answer.id}>
                <label className={`label-container ${answersStatus[answer.id]}`}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(answer.id)}
                    disabled={!!answersStatus[answer.id]}
                  />
                  <div className="checkmark">
                    <div className="answer-text">
                      {answer.answerText}
                    </div>
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
      </div>
    </div>
  );
};

export default Quiz;
