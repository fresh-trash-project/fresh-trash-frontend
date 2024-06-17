import { globalAuctionsAPI } from '../../variable';
import createAxiosWithToken from './Axios';

const axiosWithTokenAuctions = createAxiosWithToken(globalAuctionsAPI);

//경매 목록 요청
const fetchQuery = async query => {
  try {
    const response = await axiosWithTokenAuctions.get(`${query}`);
    const responseData = response.data;
    if (response.status === 200) {
      return {
        content: responseData.content,
        totalPages: responseData.totalPages,
        totalElements: responseData.totalElements,
        pageable: responseData.pageable,
      };
    }
  } catch (error) {
    console.log('게시글 목록을 가져오는 중 에러 발생', error);
    if (error.response.status === 404) {
      console.log(
        '404 Error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};
export const fetchAuctions = {
  getPage: async (currentPage, sort) =>
    await fetchQuery(`?page=${currentPage}&sort=${sort}`),
  titleSearch: async (keyword, currentPage, sort) =>
    await fetchQuery(`?title=${keyword}&page=${currentPage}&sort=${sort}`),
  districtSearch: async (keyword, currentPage, sort) =>
    await fetchQuery(`?district=${keyword}&page=${currentPage}&sort=${sort}`),
  category: async (search, currentPage, sort) =>
    await fetchQuery(`?category=${search}&page=${currentPage}&sort=${sort}`),
};
