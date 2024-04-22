import axios from 'axios';
// const API_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080';

//
export const fetchUserNames = async () => {
  try {
    const response = await axios.get(`${API_URL}/check-nickname`, {
      params: {
        nickname: userName,
      },
    });

    if (response.status === 200 && response.data.length === 0) {
      setDuplicationMessage('사용 가능한 닉네임입니다.');
      setIsDuplicate(false);
    } else {
      setDuplicationMessage('중복된 닉네임입니다.');
      setIsDuplicate(true);
    }
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error('사용자 닉네임을 가져오는 중 에러 발생:', error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
