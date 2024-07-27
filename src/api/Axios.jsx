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
      // AccessToken을 로컬 스토리지에서 가져와서 헤더에 추가
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      // FormData 객체를 사용하는 요청인 경우 Content-Type 변경
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
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
