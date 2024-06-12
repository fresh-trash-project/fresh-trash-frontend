import createAxiosWithToken from './Axios';
import { globalProductDeals } from '../../variable';

const axiosWithToken = createAxiosWithToken(globalProductDeals);

//나의 판매내역 > 판매중 리스트
export const fetchMySellOngoing = async page => {
  try {
    const response = await axiosWithToken.get(``, {
      params: { memberType: 'SELLER_ONGOING', page },
    });
    if (response.status === 200) {
      console.log('나의 판매중 리스트를 불러왔습니다.', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};

//나의 판매내역 > 판매완료 리스트
export const fetchMySellClose = async page => {
  try {
    const response = await axiosWithToken.get(``, {
      params: { memberType: 'SELLER_CLOSE', page },
    });
    if (response.status === 200) {
      console.log('나의 판매완료 리스트를 불러왔습니다.', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log('404에러: 토큰삭제 로그아웃');
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};

//나의 구매내역 > 거래완료 리스트
export const fetchMyBuyList = async page => {
  try {
    const response = await axiosWithToken.get(``, {
      params: { memberType: 'BUYER', page },
    });
    if (response.status === 200) {
      console.log('나의 구매내역을 불러왔습니다.', response.data);
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
