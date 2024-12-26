

import axios from 'axios';

export const contactAxiosInstance = axios.create({
  baseURL: 'http://localhost:5004/api/inquiry',
});

