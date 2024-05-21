import axios from 'axios';

const createAxiosWithToken = baseURL => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export default createAxiosWithToken;
