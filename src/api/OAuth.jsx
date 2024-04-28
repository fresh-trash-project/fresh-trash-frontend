import axios from 'axios';

const API_URL = 'http://localhost:8080/oauth2/authorization';

// OAUTH
export const KakaoOAUTH = async () => {
  try {
    const response = await axios.get(`${API_URL}/kakao`);
    console.log(response);
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};

export const NaverOAUTH = async () => {
  try {
    const response = await axios.get(`${API_URL}/naver`);
    console.log(response);
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};

export const GoogleOAUTH = async () => {
  try {
    const response = await axios.get(`${API_URL}/google`);
    console.log(response);
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};
