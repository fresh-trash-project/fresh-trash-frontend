import createAxiosWithToken from './Axios';
import { globalProductsAPI } from '../../variable';
import { CONSOLE } from '../../Constants';

const axiosWithToken = createAxiosWithToken(globalProductsAPI);

//나의 관심목록 > 판매완료 리스트
export const fetchMyLikes = async (category, page, navigate) => {
  try {
    const response = await axiosWithToken.get('/likes', {
      params: {
        category: category === '전체' ? '' : category,
        page: page,
      },
    });
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_MY_LIKES_SUCCESS, response.data);
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
