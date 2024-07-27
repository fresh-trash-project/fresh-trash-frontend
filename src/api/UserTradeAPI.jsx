import createAxiosWithToken from './Axios';
import { globalProductDealsAPI } from '../../variable';
import { CONSOLE } from '../../Constants';

const axiosWithToken = createAxiosWithToken(globalProductDealsAPI);

//나의 판매내역 > 판매중 리스트
export const fetchMySellOngoing = async (page, navigate) => {
  try {
    const response = await axiosWithToken.get(``, {
      params: { memberType: 'SELLER_ONGOING', page },
    });
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_MY_ON_SALE_LIST_SUCCESS, response);
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

//나의 판매내역 > 판매완료 리스트
export const fetchMySellClose = async (page, navigate) => {
  try {
    const response = await axiosWithToken.get(``, {
      params: { memberType: 'SELLER_CLOSE', page },
    });
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_MY_DONE_SALE_LIST_SUCCESS, response.data);
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

//나의 구매내역 > 거래완료 리스트
export const fetchMyBuyList = async (page, navigate) => {
  try {
    const response = await axiosWithToken.get(``, {
      params: { memberType: 'BUYER', page },
    });
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_MY_BUY_LIST_SUCCESS, response.data);
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
