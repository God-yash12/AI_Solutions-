

import axios from 'axios';

export const contactAxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/inquiry',
});

