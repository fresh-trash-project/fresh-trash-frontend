import createAxiosWithToken from './Axios';
import { globalAuctionsAPI } from '../../variable';
import { CONSOLE } from '../../Constants';

const axiosWithToken = createAxiosWithToken(globalAuctionsAPI);

//나의 경매내역 > 경매중 리스트
export const fetchMyAuctionOngoing = async (page, navigate) => {
  try {
    const response = await axiosWithToken.get(`/logs`, {
      params: { memberType: 'AUCTION_ONGOING', page },
    });
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_MY_ONGOING_AUCTION_LIST_SUCCESS, response);
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

//나의 경매내역 > 경매(판매) 완료 리스트
export const fetchMyAuctionClose = async (page, navigate) => {
  try {
    const response = await axiosWithToken.get(`/logs`, {
      params: { memberType: 'AUCTION_CLOSE', page },
    });
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_MY_DONE_AUCTION_LIST_SUCCESS, response.data);
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

//나의 경매내역 > 낙찰 리스트
export const fetchMyBid = async (page, navigate) => {
  try {
    const response = await axiosWithToken.get(`/logs`, {
      params: { memberType: 'WINNING_BID', page },
    });
    if (response.status === 200) {
      console.log(CONSOLE.FETCH_MY_WINNING_BID_LIST_SUCCESS, response.data);
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
