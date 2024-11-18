import apiUrl from '../configuration/config';
import instance from '../configuration/interceptor';

const getScenarioGameById = async (id) => {
    try {
        const response = await instance.get(`${apiUrl}/getScenarioGame/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching scenario with id ${id}:`, error);
        throw error;
    }
};

const verifyAnswerScenario = async (scenarioId, scenarioTextId, selectedOptionIds) => {
    try {
        const response = await instance.post(`${apiUrl}/verifyAnswerScenario/${scenarioId}/${scenarioTextId}`,selectedOptionIds);
        return response.data;
    } catch (error) {
        console.error('Error verifying answers:', error);
        throw error;
    }
};

const scenarioGameService = {
    getScenarioGameById,
    verifyAnswerScenario
};

export default scenarioGameService;