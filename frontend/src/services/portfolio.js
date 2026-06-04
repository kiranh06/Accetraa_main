import axiosInstance from './axiosInstance';

export const getPortfolio = async (params = {}) => {
  const response = await axiosInstance.get('/api/v1/portfolio/', { params });
  return response.data;
};

export const getPortfolioFeatured = () => getPortfolio({ featured: true });

export const getPortfolioCategories = async () => {
  const response = await axiosInstance.get('/api/v1/portfolio/categories/');
  return response.data;
};
