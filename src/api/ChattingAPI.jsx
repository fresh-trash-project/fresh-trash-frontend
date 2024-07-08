import {
  globalProductDealsAPI,
  globalChatAPI,
  globalProductsAPI,
} from '../../variable';
import createAxiosWithToken from './Axios';
import { CONSOLE, MESSAGES } from '../../Constants';

// const axiosWithTokenTransactions = createAxiosWithToken(globalTransactionsAPI);
const axiosWithTokenProducts = createAxiosWithToken(globalProductsAPI);
const axiosWithTokenChat = createAxiosWithToken(globalChatAPI);

//채팅요청  api
export const chatPost = async (productId, navigate) => {
  try {
    const response = await axiosWithTokenProducts.post(`/${productId}/chats`);
    if (response.status === 201) {
      console.log(CONSOLE.CHATROOM_SUCCESS, response.data);
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
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
      console.log(CONSOLE.CHAT_LIST_SUCCESS, response.data);
      return response.data;
    }
    return response.data.content;
  } catch (error) {
    console.error(error.message);
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
      console.log(CONSOLE.CHATROOM_OUT);
    }
  } catch (error) {
    console.error(error.message);
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
      console.log(CONSOLE.CHAT_CONTENT, response.data);
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
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
      console.log(CONSOLE.TRANSACTION_SUCCESS, response.data);
    }
  } catch (error) {
    console.error(error.message);
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
      console.log(CONSOLE.PRODUCT_DEAL_SUCCESS);
    }
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

//신고하기 api
export const reportPost = async (chatRoomId, navigate) => {
  try {
    const response = await axiosWithTokenChat.post(`/${chatRoomId}/flag`);
    if (response.status === 200) {
      if (!toast.isActive('flag_success')) {
        toast.success(MESSAGES.FLAG_SUCCESS, {
          toastId: 'flag_success',
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
