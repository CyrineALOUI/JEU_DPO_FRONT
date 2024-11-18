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

const revealWordManually = async (crosswordId, wordId) => {
    try {
        const response = await instance.post(`${apiUrl}/crossword/revealWordManually/${crosswordId}/${wordId}`);
        console.log('Response from revealWordManually:', response.data);
        return response.data; // Retourne le message de succès ou une erreur si il y en a
    } catch (error) {
        console.error(`Error revealing word manually for crossword with id ${crosswordId} and word with id ${wordId}:`, error);
        throw error;
    }
};

const showHint = async (crosswordId) => {
    try {
        const response = await instance.post(`${apiUrl}/showHint/${crosswordId}`);
        console.log('Response from showHint:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error revealing hint for crossword with id ${crosswordId}:`, error);
        throw error;
    }
};

const getRevealedWords = async (crosswordId) => {
    try {
        const response = await instance.get(`${apiUrl}/getRevealedWords/${crosswordId}`);
        console.log('Response from getRevealedWords:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching revealed words for crossword with id ${crosswordId}:`, error);
        throw error;
    }
};

const calculateScore = async (crosswordId) => {
    try {
        const response = await instance.get(`${apiUrl}/crossword/calculateScore/${crosswordId}`);
        console.log('Response from calculateScore:', response.data);
        return response.data; // Retourne le score total calculé
    } catch (error) {
        console.error(`Error calculating score for crossword with id ${crosswordId}:`, error);
        throw error;
    }
};


const crosswordService = {
    getCrosswordById,
    revealWordManually,
    showHint,
    getRevealedWords,
    calculateScore
  };
  
  export default crosswordService;
