import { globalAuctionsAPI } from '../../variable';
import createAxiosWithToken from './Axios';
import { CONSOLE } from '../../Constants';

const axiosWithTokenAuctions = createAxiosWithToken(globalAuctionsAPI);

//경매 목록 요청
const fetchQuery = async (query, navigate) => {
  try {
    const response = await axiosWithTokenAuctions.get(`${query}`);
    const responseData = response.data;
    if (response.status === 200) {
      console.log(response.data);
      return {
        content: responseData.content,
        totalPages: responseData.totalPages,
        totalElements: responseData.totalElements,
        pageable: responseData.pageable,
      };
    }
  } catch (error) {
    console.log(CONSOLE.FETCH_POSTS_ERROR, error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
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

//경매 상세목록 요청
export const detailAuction = async (auctionId, navigate) => {
  try {
    const response = await axiosWithTokenAuctions.get(`${auctionId}`);
    if (response.status === 200) {
      console.log('경매 상품 상세정보를 불러왔습니다.', response.data);
      return response.data;
    }
  } catch (error) {
    console.log('경매 상품 상세정보를 가져오는 중 에러발생:', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//경매 상품 삭제
export const deleteAuction = async (auctionId, navigate) => {
  try {
    const response = await axiosWithTokenAuctions.delete(`${auctionId}`);
    if (response === 204) {
      console.log('경매 상품 삭제 성공');
    }
  } catch (error) {
    console.log('경매 상품 삭제가 완료되었습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//경매 상품 등록
export const createAuction = async (
  title,
  content,
  productCategory,
  productStatus,
  auctionStatus,
  minimumBid,
  formattedStartedAt,
  formattedEndedAt,
  imgFile,
  navigate,
) => {
  try {
    const auctionRequest = {
      title: title,
      content: content,
      productCategory: productCategory,
      productStatus: productStatus,
      auctionStatus: auctionStatus,
      minimumBid: minimumBid,
      startedAt: formattedStartedAt,
      endedAt: formattedEndedAt,
    };
    const json = JSON.stringify(auctionRequest);
    const blob = new Blob([json], { type: 'application/json' });

    const formData = new FormData();
    console.log(imgFile);
    console.log(auctionRequest);
    formData.append('imgFile', imgFile);
    formData.append('auctionRequest', blob);
    const response = await axiosWithTokenAuctions.post(``, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      console.log('경매 제품 등록을 완료했습니다.');
      navigate('/AuctionList');
    }
  } catch (error) {
    console.error('경매 제품 등록을 실패하였습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//경매 입찰

export const AuctionBid = async (biddingPrice, auctionId, navigate) => {
  try {
    const requestData = {
      biddingPrice: biddingPrice,
    };
    const response = await axiosWithTokenAuctions.put(
      `${auctionId}/bid`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 200) {
      console.log('입찰 완료되었습니다.');
      navigate('/MyPage/MyAuctionList');
    }
  } catch (error) {
    console.log('입찰 실패하였습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//경매 결제
export const AuctionPay = async auctionId => {
  try {
    const response = await axiosWithTokenAuctions.put(`${auctionId}/pay`);
    if (response.status === 200) {
      console.log('결제완료되었습니다.');
    }
  } catch (error) {
    console.log('결제를 실패하였습니다.');
  }
};
