import { globalNotisAPI } from '../../variable';
import createAxiosWithToken from './Axios';
import { CONSOLE } from '../../Constants';

const axiosWithToken = createAxiosWithToken(globalNotisAPI);

//전체 알림 조회
export const fetchAlarm = async navigate => {
  try {
    const response = await axiosWithToken.get('');
    if (response.status === 200) {
      return response.data.content;
    }
  } catch (error) {
    console.log(error.message);
  }
  if (error.response.status === 401) {
    console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
    localStorage.removeItem('accessToken');
    navigate('/signupsignin');
  }
  throw error;
};

//받은 알림 클릭시 PUT 요청 -> 알림읽음처리
export const readAlarm = async (notisId, navigate) => {
  try {
    const response = await axiosWithToken.put(`/${notisId}`);
    if (response.status === 200) {
      console.log(CONSOLE.ALARM_READ, response.data);
    }
  } catch (error) {
    console.log(error.message);
  }
  if (error.response.status === 401) {
    console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
    localStorage.removeItem('accessToken');
    navigate('/signupsignin');
  }
  throw error;
};
