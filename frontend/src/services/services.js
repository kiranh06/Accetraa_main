import axiosInstance from './axiosInstance';

export const getServices = async () => {
  const response = await axiosInstance.get('/api/v1/services/');
  return response.data;
};
