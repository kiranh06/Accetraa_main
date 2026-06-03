import axiosInstance from './axiosInstance';

export const submitContact = async (payload) => {
  const response = await axiosInstance.post('/api/v1/contact/', payload);
  return response.data;
};

export const submitConsultation = async (payload) => {
  const response = await axiosInstance.post('/api/v1/consultation/', payload);
  return response.data;
};

export const submitDemo = async (payload) => {
  const response = await axiosInstance.post('/api/v1/demo/', payload);
  return response.data;
};
