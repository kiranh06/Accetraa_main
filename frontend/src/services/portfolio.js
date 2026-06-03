import axiosInstance from './axiosInstance';

export const getPortfolio = async () => {
  const response = await axiosInstance.get('/api/v1/portfolio/');
  return response.data;
};
