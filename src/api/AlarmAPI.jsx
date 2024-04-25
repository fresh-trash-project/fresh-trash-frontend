import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080/api/v1';

//전체 알람 조회
export const fetchAlarm = async () => {
  const accessToken = localStorage.getItem('access-token');
  try {
    const response = await axios.get(`${API_URL}/notis`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.content;
    console.log(response.data.content);
  } catch (error) {
    console.error('Error fetching ratings: ', error);
  }
};

//받은 알림 클릭시 PUT 요청 -> 알림읽음처리
export const readAlarm = async () => {
  const accessToken = localStorage.getItem('access-token');
  try {
    const response = await axios.put(`${API_URL}/notis/{notisId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
    console.log(response);
  } catch (error) {
    console.error('Error fetching ratings: ', error);
  }
};
