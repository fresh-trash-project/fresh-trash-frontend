import { globalAuctionsAPI, globalProductsAPI } from '../../variable';
import createAxiosWithToken from './Axios';
import { toast } from 'react-toastify';
import { MESSAGES, CONSOLE } from '../../Constants';

const axiosWithTokenAuctions = createAxiosWithToken(globalAuctionsAPI);
const axiosWithTokenProducts = createAxiosWithToken(globalProductsAPI);

// 애물단지 리뷰 작성
export const sendProductReview = async (productId, rate, navigate) => {
  try {
    const response = await axiosWithTokenProducts.post(
      `/${productId}/reviews`,
      {
        rate,
      },
    );
    if (response.status === 201) {
      console.log(response.data);
      toast.success(MESSAGES.SEND_RATING_SUCCESS);
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    if (error.response.status === 400) {
      toast.error(MESSAGES.ALREADY_SENT_RATING);
    }
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
// 경매 리뷰 작성
export const sendAuctionReview = async (auctionId, rate, content, navigate) => {
  try {
    const response = await axiosWithTokenAuctions.post(
      `/${auctionId}/reviews`,
      {
        rate,
        content,
      },
    );
    if (response.status === 201) {
      console.log(response.data);
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    if (error.response.status === 400) {
      toast.error(MESSAGES.ALREADY_SENT_RATING);
    }
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
