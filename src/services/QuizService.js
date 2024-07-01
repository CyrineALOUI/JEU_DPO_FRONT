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

export default {
  getQuizById
};
