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

const revealWordManually = async (crosswordId, wordText) => {
    try {
        const response = await instance.post(`${apiUrl}/revealWordManually/${crosswordId}`, null, {
            params: { wordText }
        });
        console.log('Word revealed manually:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error revealing word manually for crossword id ${crosswordId}:`, error);
        throw error;
    }
};

const revealWordWithHint = async (crosswordId) => {
    try {
        const response = await instance.post(`${apiUrl}/revealWordWithHint/${crosswordId}`);
        console.log('Word revealed with hint:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error revealing word with hint for crossword id ${crosswordId}:`, error);
        throw error;
    }
};

const crosswordService = {
    getCrosswordById,
    revealWordManually,
    revealWordWithHint
};

export default crosswordService;
