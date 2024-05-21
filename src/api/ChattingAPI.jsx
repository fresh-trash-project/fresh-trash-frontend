import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const axiosWithToken = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    Authorization: localStorage.getItem('access-token'), // 로컬 스토리지에서 토큰을 가져와 헤더에 추가
  },
});
//채팅요청  api
export const chatPost = async wasteId => {
  try {
    const response = await axiosWithToken.post(`/wastes/${wasteId}/chats`);
    if (response.status === 201) {
      console.log('채팅방 생성 성공', response.data);
      return response.data;
    }
  } catch (error) {
    console.log('채팅방 생성 실패', error);
  }
};

//채팅목록 api
export const ListFetch = async (page = 0, size = 10) => {
  try {
    const response = await axiosWithToken.get(`/chats`, {
      params: { page, size },
    });
    if (response.status === 200) {
      console.log('채팅방목록을 불러왔습니다.', response.data);
      return response.data;
    }
  } catch (error) {
    console.log('채팅방 목록을 불러오는데 실패했습니다.', error);
  }
};

//채팅 나가기 api
export const deleteChat = async chatRoomId => {
  try {
    const response = await axiosWithToken.put(`/chats/${chatRoomId}`);
    if (response.status === 204) {
      console.log('게시물 삭제 성공');
    }
  } catch (error) {
    console.error('게시물을 삭제하는 중 오류가 발생했습니다:', error);
  }
};

//채팅 내용 조회 api

export const contentFetch = async chatRoomId => {
  try {
    const response = await axiosWithToken.get(`/chats/${chatRoomId}`);
    if (response.status === 200) {
      console.log('채팅 내용을 불러왔습니다.', response.data);
      return response.data;
    }
  } catch (error) {
    console.log('채팅 내용을 불러오는데 실패했습니다.', error);
  }
};

//거래 완료 요청 api
export const completePost = async (wasteId, chatRoomId) => {
  try {
    const response = await axiosWithToken.post(
      `/transactions/${wasteId}/chats/${chatRoomId}`,
    );
    if (response.status === 201) {
      console.log('판매완료 요청을 성공했습니다.', response.data);
    }
  } catch (error) {
    console.log('판매완료 요청을 실패했습니다.', error);
  }
};
//
//예약중,판매중 api
const statusPost = async (chatRoomId, query) => {
  try {
    const response = await axiosWithToken.post(
      `/transactions/chats/${chatRoomId}/status${query}`,
    );
    if (response.status === 200) {
      console.log('판매상태가 예약중으로 변경되었습니다.', response.data);
    }
  } catch (error) {
    console.log('판매상태가 예약중으로 변경 실패하였습니다.', error);
  }
};
export const statusChange = {
  sellStatus: async (chatRoomId, status) =>
    await statusPost(chatRoomId, `?sellStatus=${status}`),
};

//신고하기 api
export const reportPost = async chatRoomId => {
  try {
    const response = await axiosWithToken.post(
      `/transactions/chats/${chatRoomId}/flag`,
    );
    if (response.status === 200) {
      console.log('신고 신청이 완료되었습니다.', response.data);
    }
  } catch (error) {
    console.log('신고 신청을 실패하였습니다.', error);
  }
};
