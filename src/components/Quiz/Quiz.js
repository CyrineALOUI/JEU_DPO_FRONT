import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizService from '../../services/QuizService';
import './Quiz.css';

const Quiz = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await QuizService.getQuizById(quizId);
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const handleCheckboxChange = (questionId, answerId) => {
    console.log(`Question ID: ${questionId}, Answer ID: ${answerId}`);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {quiz.questions.map((question) => (
          <div key={question.id} className="question-container">
            <h3 className="question-text">{question.questionText}</h3>
            <ul className="answer-list">
              {question.answers.map((answer) => (
                <li key={answer.id}>
                  <label className="label-container">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(question.id, answer.id)}
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
            <button className="button-quiz" type="submit">Répondre</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
