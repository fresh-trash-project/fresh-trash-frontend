import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:8080/api/v1';

//닉네임 중복 확인
export const fetchUserNames = async (
  setIsDuplicate,
  setDuplicationMessage,
  userName,
  setUserName,
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
      console.log(response);
      setDuplicationMessage('사용 가능한 닉네임입니다.');
      setIsDuplicate(false);
      setUserName(userName);
    }
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    if (error.response.status === 400) {
      setDuplicationMessage('중복된 닉네임입니다.');
      setIsDuplicate(true);
    }
  }
};

// 프로필 수정
export const changeUserInfo = async (
  userName,
  address,
  image,
  setRegisterMessage,
) => {
  try {
    const memberRequest = {
      nickname: userName,
      address: {
        zipcode: address.zipcode,
        state: address.state,
        city: address.city,
        district: address.district,
        detail: address.detail,
      },
    };
    const json = JSON.stringify(memberRequest);
    const blob = new Blob([json], { type: 'application/json' });
    var formData = new FormData();
    formData.append('imgFile', image);
    formData.append('memberRequest', blob);

    const accessToken = localStorage.getItem('access-token');

    const response = await axios.put(`${API_URL}/members`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      console.log('프로필 수정 성공');
    }
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
  }
};

//사용자 평점
export const fetchRating = async () => {
  const accessToken = localStorage.getItem('access-token');
  try {
    const response = await axios.get(`${API_URL}/members`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
    const averageRating = response.data.rating;
    return averageRating;
  } catch (error) {
    console.error('Error fetching ratings: ', error);
  }
};
