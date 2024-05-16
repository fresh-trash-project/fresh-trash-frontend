import { globalNotisAPI } from '../../variable';
import createAxiosWithToken from './Axios';

const axiosWithToken = createAxiosWithToken(globalNotisAPI);

//전체 알림 조회
export const fetchAlarm = async navigate => {
  try {
    const response = await axiosWithToken.get('');
    if (response.status === 200) {
      console.log('알림 조회 성공', response.data);
      return response.data.content;
    }
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    } else if (error.response.status === 401) {
      console.log('401 Unauthorized: 유효하지 않은 토큰 또는 만료된 토큰');
      localStorage.removeItem('accessToken');
      alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
      navigate('/signupsignin');
      // window.location.href = '/signupsignin'; // 로그인 페이지로 리다이렉트
    }
    throw error;
  }
};

//받은 알림 클릭시 PUT 요청 -> 알림읽음처리
export const readAlarm = async (notisId, navigate) => {
  try {
    const response = await axiosWithToken.put(`/${notisId}`);
    if (response.status === 200) {
      console.log('알림 읽음 처리', response.data);
    }
  } catch (error) {
    console.error('Error updating notification status: ', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    } else if (error.response.status === 401) {
      console.log('401 Unauthorized: 유효하지 않은 토큰 또는 만료된 토큰');
      localStorage.removeItem('accessToken');
      alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
      navigate('/signupsignin');
    }
    throw error;
  }
};
