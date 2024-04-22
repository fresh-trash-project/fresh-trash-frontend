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
  setRegisterMessage,
) => {
  try {
    const response = await axios.get(`${API_URL}/auth/check-nickname`, {
      params: {
        nickname: userName,
      },
    });

    console.log(response);
    if (response.status === 200) {
      setDuplicationMessage('사용 가능한 닉네임입니다.');
      setIsDuplicate(false);
    }
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    if (error.response.status === 400) {
      setDuplicationMessage('중복된 닉네임입니다.');
      setIsDuplicate(true);
    }
    //! 에러 세부적으로 나누기
  }
};

export const changeUserInfo = async (
  userName,
  address,
  image,
  setRegisterMessage,
) => {
  try {
    const response = await axios.put(`${API_URL}/members`, {
      imgFile: image,
      memberRequest: {
        nickname: userName,
        address: {
          zipcode: address.zipcode,
          state: address.state,
          city: address.city,
          district: address.district,
          detail: address.detail,
        },
      },
    });

    console.log(response);

    if (response.status === 200) {
      console.log('프로필 수정 성공');
    }
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
  }
};
