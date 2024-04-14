import axios from 'axios';
const API_URL = 'http://localhost:3000'; // 백엔드 서버 주소

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/wastes`);
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error('게시물 목록을 가져오는 중 에러 발생:', error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

export const createPost = async postData => {
  try {
    const response = await axios.post(`${API_URL}/wastes`, postData);
    return response.data; // 서버로부터 받은 생성된 게시물 데이터 반환
  } catch (error) {
    console.error('게시물을 생성하는 중 에러 발생:', error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
export const deletePost = async wasteId => {
  try {
    await axios.delete(`http://localhost:3000/wastes/${wasteId}`);
  } catch (error) {
    console.error('게시물을 삭제하는 중 오류가 발생했습니다:', error);
    throw error; // 오류를 다시 throw하여 컴포넌트에서 처리할 수 있도록 함
  }
};
export const updatePost = async (wasteId, updatedPost) => {
  const response = await axios.put(`${API_URL}/wastes/${wasteId}`, updatedPost);
  return response.data;
};
