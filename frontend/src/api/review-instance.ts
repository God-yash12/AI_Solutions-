import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const reviewInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
  return axios.create({
    baseURL: 'http://localhost:5004/api/review',  
    ...config,
  });
};
