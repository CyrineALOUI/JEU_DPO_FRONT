import apiUrl from '../configuration/config';
import instance from '../configuration/interceptor';

const getCrosswordById = async (id) => {
    try {
        const response = await instance.get(`${apiUrl}/getCrosswordById/${id}`);
        console.log('Response from getCrosswordyId:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching crossword with id ${id}:`, error);
        throw error;
    }
};

const crosswordService = {
    getCrosswordById
  };
  
  export default crosswordService;
