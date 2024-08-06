import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../../../services/QuizService';
import './Quiz.css';

const Quiz = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState(new Set());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
      alert(response ? 'Réponse Correcte' : 'Réponse incorrecte');

      //Pass question suivante
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswers(new Set());
        setIsButtonDisabled(true);
      } else {
        alert('Quiz terminé !');
      }
    } catch (error) {
      console.error('Error verifying answers:', error);
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
          <ul className="answer-list">
            {currentQuestion.answers.map((answer) => (
              <li key={answer.id}>
                <label className="label-container">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(answer.id)}
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
