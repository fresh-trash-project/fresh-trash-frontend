import axios from 'axios';

// const API_URL = 'http://localhost:3000';
// const API_URL = 'http://localhost:8080/api/v1';
// const API_URL =
//   'http://ec2-43-203-18-244.ap-northeast-2.compute.amazonaws.com:8080/api/v1';
const API_URL = ' https://fresh-trash.kro.kr';
//전체 알람 조회
export const fetchAlarm = async () => {
  const accessToken = localStorage.getItem('access-token');
  try {
    const response = await axios.get(`${API_URL}/notis`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data.content;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('access-token');
    }
  }
};

//받은 알림 클릭시 PUT 요청 -> 알림읽음처리
export const readAlarm = async notisId => {
  const accessToken = localStorage.getItem('access-token');
  console.log(localStorage);
  console.log(accessToken);
  try {
    const response = await axios.put(`${API_URL}/notis/${notisId}`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('access-token');
    }
  }
};
