import apiUrl from '../configuration/config';
import instance from '../configuration/interceptor';

const getAllLevels = async () => {
  try {
    const response = await instance.get(`${apiUrl}/listLevels`);
    console.log('Response from getAllLevels:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all levels:', error);
    throw error;
  }
};

const getLevelById = async (id) => {
  try {
    const response = await instance.get(`${apiUrl}/getLevel/${id}`);
    console.log('Response from getLevelById:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching level by id:', error);
    throw error;
  }
};

const getStarsForPlayer = async (levelId) => {
  try {
    const response = await instance.get(`${apiUrl}/getStars/${levelId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching stars for player:', error);
    throw error;
  }
};

const levelService = {
  getAllLevels,
  getLevelById,
  getStarsForPlayer
};

export default levelService;
