import { globalNotisAPI } from '../../variable';
import createAxiosWithToken from './Axios';
import { CONSOLE } from '../../Constants';

const axiosWithToken = createAxiosWithToken(globalNotisAPI);

//전체 알림 조회
export const fetchAllAlarms = async navigate => {
  let page = 0;
  let allAlarms = [];
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosWithToken.get(`?page=${page}`);
      if (response.status === 200) {
        allAlarms = [...allAlarms, ...response.data.content];
        hasMore = !response.data.last; // 마지막 페이지가 아니면 true
        page++;
      }
    }
    return allAlarms;
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//페이지별 알림 조회
// export const fetchAlarm = async (page, navigate) => {
//   try {
//     const response = await axiosWithToken.get(`?page=${page}`);
//     if (response.status === 200) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
//   if (error.response.status === 401) {
//     console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
//     localStorage.removeItem('accessToken');
//     navigate('/signupsignin');
//   }
//   throw error;
// };

//받은 알림 클릭시 PUT 요청 -> 알림읽음처리
export const readAlarm = async (notisId, navigate) => {
  try {
    const response = await axiosWithToken.put(`/${notisId}`);
    if (response.status === 200) {
      console.log(CONSOLE.ALARM_READ, response.data);
      return response.data;
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
