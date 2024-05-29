import createAxiosWithToken from './Axios';
import { globalWastesAPI } from '../../variable';

const axiosWithToken = createAxiosWithToken(globalWastesAPI);

//나의 관심목록 > 판매완료 리스트
export const fetchMyLikes = async (search, currentPage) => {
  try {
    const response = await axiosWithToken.get(
      `/likes?category=${search}&page=${currentPage}`,
    );
    if (response.status === 200) {
      console.log('나의 관심목록을 불러왔습니다.', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log(
        '404에러: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};
