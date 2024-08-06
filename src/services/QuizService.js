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

const verifyAnswers = async (answerIds) => {
  try {
    const response = await instance.post(`${apiUrl}/verifyAnswers`, answerIds);
    console.log('Response from verifyAnswers:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying answers:', error);
    throw error;
  }
};

const quizService = {
  getQuizById,
  verifyAnswers
};

export default quizService;

