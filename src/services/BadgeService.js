import apiUrl from '../configuration/config';
import instance from '../configuration/interceptor';

const unlockBadgeForQuiz = async (levelId) => {
    try {
        const response = await instance.post(`${apiUrl}/unlockBadgeForQuiz/${levelId}`);
        console.log(response.data);
        return response;
    } catch (error) {
        console.error("Erreur lors du déblocage du badge:", error);
        throw error; 
    }
};

const unlockBadgeForScenario = async (scenarioId) => {
    try {
        const response = await instance.post(`${apiUrl}/unlockBadgeForScenario/${scenarioId}`);
        console.log(response.data);
        return response; 
    } catch (error) {
        console.error("Erreur lors du déblocage du badge:", error);
        throw error; 
    }
};

const unlockBadgeForCrossword = async (crosswordId) => {
    try {
        const response = await instance.post(`${apiUrl}/unlockBadgeForCrossword/${crosswordId}`);
        console.log(response.data);
        return response; 
    } catch (error) {
        console.error("Erreur lors du déblocage du badge:", error);
        throw error; 
    }
};

const getUnlockedBadgesForPlayer = async () => {
    try {
        const response = await instance.get(`${apiUrl}/unlockedBadgesForPlayer`);
        const badges = response.data;
        console.log(badges);
        return badges;
    } catch (error) {
        console.error("Error fetching badges:", error);
        return [];
    }
};

const badgeService = {
    unlockBadgeForQuiz,
    unlockBadgeForScenario,
    unlockBadgeForCrossword,
    getUnlockedBadgesForPlayer  
};

export default badgeService;