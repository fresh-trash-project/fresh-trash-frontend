import {
  globalProductDealsAPI,
  globalChatAPI,
  globalProductsAPI,
} from '../../variable';
import createAxiosWithToken from './Axios';
import { CONSOLE } from '../../Constants';

// const axiosWithTokenTransactions = createAxiosWithToken(globalTransactionsAPI);
const axiosWithTokenProducts = createAxiosWithToken(globalProductsAPI);
const axiosWithTokenChat = createAxiosWithToken(globalChatAPI);

//채팅요청  api
export const chatPost = async (productId, navigate) => {
  try {
    const response = await axiosWithTokenProducts.post(`/${productId}/chats`);
    if (response.status === 201) {
      console.log('채팅방 생성 성공', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('채팅방 생성 실패', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//채팅목록 api
export const ListFetch = async (page = 0, size = 10, navigate) => {
  try {
    const response = await axiosWithTokenChat.get('', {
      params: { page, size },
    });
    if (response.status === 200) {
      console.log('채팅방목록을 불러왔습니다.', response.data);
      return response.data;
    }
    return response.data.content;
  } catch (error) {
    console.error('채팅방 목록을 불러오는데 실패했습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//채팅 나가기 api
export const deleteChat = async (chatRoomId, navigate) => {
  try {
    const response = await axiosWithTokenChat.put(`/${chatRoomId}`);
    if (response.status === 204) {
      console.log('게시물 삭제 성공');
    }
  } catch (error) {
    console.error('게시물을 삭제하는 중 오류가 발생했습니다:', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//채팅 내용 조회 api

export const contentFetch = async (chatRoomId, navigate) => {
  try {
    const response = await axiosWithTokenChat.get(`/${chatRoomId}`);
    if (response.status === 200) {
      console.log('채팅 내용을 불러왔습니다.', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('채팅 내용을 불러오는데 실패했습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//거래 완료 요청 api
export const completePost = async (wasteId, chatRoomId, navigate) => {
  try {
    const response = await axiosWithTokenTransactions.post(
      `/${wasteId}/chats/${chatRoomId}`,
    );
    if (response.status === 201) {
      console.log('판매완료 요청을 성공했습니다.', response.data);
    }
  } catch (error) {
    console.error('판매완료 요청을 실패했습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//거래처리
export const statusChat = async (chatRoomId, productEventType, navigate) => {
  try {
    const response = await axiosWithTokenChat.post(
      `/${chatRoomId}/productDeal`,
      null,
      {
        params: {
          productEventType: productEventType,
        },
      },
    );
    if (response.status === 200) {
      console.log('거래처리 상태 변경을 성공하였습니다.');
    }
  } catch (error) {
    console.log('판매상태가 예약중으로 변경 실패하였습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//신고하기 api
export const reportPost = async (chatRoomId, navigate) => {
  try {
    const response = await axiosWithTokenChat.post(`/${chatRoomId}/flag`);
    if (response.status === 200) {
      console.log('신고 신청이 완료되었습니다.', response.data);
    }
  } catch (error) {
    console.error('신고 신청을 실패하였습니다.', error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
