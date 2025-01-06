import apiUrl from '../configuration/config';
import instance from '../configuration/interceptor';

const getAudioGameById = async (id) => {
    try {
        const response = await instance.get(`${apiUrl}/getAudioGame/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching audio with id ${id}:`, error);
        throw error;
    }
};

const verifyAnswerAudio = async (audioGameId, selectedOptionId) => {
    try {
        const response = await instance.post(`${apiUrl}/verifyAnswerAudio/${audioGameId}`, {
            selectedOptionId, // Envoyé comme un objet JSON
        });
        return response.data;
    } catch (error) {
        console.error(`Error verifying answer for audio game ${audioGameId}:`, error);
        throw error;
    }
};


const audioGameService = {
    getAudioGameById,
    verifyAnswerAudio
};

export default audioGameService;