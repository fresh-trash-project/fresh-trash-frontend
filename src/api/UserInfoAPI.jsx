import { globalMembersAPI } from '../../variable';
import { globalAuthAPI } from '../../variable';
import createAxiosWithToken from './Axios';

const axiosWithTokenMembers = createAxiosWithToken(globalMembersAPI);
const axiosWithTokenAuth = createAxiosWithToken(globalAuthAPI);

//닉네임 중복 확인
export const fetchUserNames = async (
  setIsDuplicate,
  setDuplicationMessage,
  userName,
  setUserName,
  setRegisterMessage,
  signIn,
  setSignIn,
) => {
  try {
    const response = await axiosWithTokenAuth.get('/check-nickname', {
      params: {
        nickname: userName,
      },
    });

    if (response.status === 200) {
      setDuplicationMessage('사용 가능한 닉네임입니다.');
      setIsDuplicate(false);
      setUserName(userName);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    if (error.response.status === 400) {
      setDuplicationMessage('중복된 닉네임입니다.');
      setIsDuplicate(true);
    }
    if (signIn && error.response.status === 404) {
      console.log(
        '404에러: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      setSignIn(false);
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};

//프로필 변경
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
    console.log(image);
    formData.append('imgFile', image);
    formData.append('memberRequest', blob);

    const response = await axiosWithTokenMembers.put('', formData);

    if (response.status === 200) {
      console.log('프로필 수정 성공');
    }
    return response;
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    if (error.response.status === 404) {
      console.log(
        '404 error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};

//사용자 평점
export const fetchRating = async () => {
  try {
    const response = await axiosWithTokenMembers.get('');
    const averageRating = response.data.rating;
    if (response.status === 200) {
      console.log('사용자 평점 받기 성공');
    }
    return averageRating;
  } catch (error) {
    console.error('Error fetching ratings: ', error);
    if (error.response.status === 404) {
      console.log(
        '404 error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};

//마이페이지 들어왔을때 유저정보 불러오기
export const fetchUserInfo = async () => {
  try {
    const response = await axiosWithTokenMembers.get('');
    if (response.status === 200) {
      console.log('사용자 정보 불러오기 성공');
      return response;
    }
  } catch (error) {
    console.error('Error fetching: ', error);
    if (error.response.status === 404) {
      console.log(
        '404 error: 요청한 리소스를 찾을 수 없습니다. 토큰삭제 로그아웃',
      );
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};
