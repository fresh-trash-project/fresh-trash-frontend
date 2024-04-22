import axios from 'axios';
import { useRecoilState } from 'recoil';
import {
  duplicationMessageState,
  duplicationState,
} from '../recoil/RecoilUserName';

// const API_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080/api/v1';

//
export const fetchUserNames = async (
  setIsDuplicate,
  setDuplicationMessage,
  userName,
) => {
  // const [isDuplicate, setIsDuplicate] = useRecoilState(duplicationState);
  // const [duplicationMessage, setDuplicationMessage] = useRecoilState(
  //   duplicationMessageState,
  // );

  try {
    const response = await axios.get(`${API_URL}/auth/check-nickname`, {
      params: {
        nickname: userName,
      },
    });

    if (response.status === 200) {
      setDuplicationMessage('사용 가능한 닉네임입니다.');
      setIsDuplicate(false);
    }
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    //! 에러 세부적으로 나누기
  }
};
