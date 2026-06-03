import axiosInstance from './axiosInstance';

export const getProducts = async () => {
  const response = await axiosInstance.get('/api/v1/products/');
  return response.data;
};
