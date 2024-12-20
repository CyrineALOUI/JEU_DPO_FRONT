import apiUrl from '../configuration/config';
import instance from '../configuration/interceptor';

const getQuizById = async (id) => {
  try {
    const response = await instance.get(`${apiUrl}/getQuiz/${id}`);
    console.log('Response from getQuizById:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz with id ${id}:`, error);
    throw error;
  }
};

const verifyAnswer = async (questionId, givenAnswer) => {
  try {
    const response = await instance.post(`${apiUrl}/verifyAnswer/${questionId}`, null, { params: { givenAnswer } });
    console.log('Response from verifyAnswer:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying answer:', error);
    throw error;
  }
};


const submitQuiz = async (quizId, correctAnswers) => {
  try {
    const response = await instance.post(`${apiUrl}/submitQuiz/${quizId}`, null, { params: { correctAnswers } });
    console.log('Response from submitQuiz:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error submitting quiz with id ${quizId}:`, error);
    throw error;
  }
};

const quizService = {
  getQuizById,
  verifyAnswer,
  submitQuiz
};

export default quizService;

