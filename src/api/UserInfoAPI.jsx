import { globalMembersAPI } from '../../variable';
import { globalAuthAPI } from '../../variable';
import createAxiosWithToken from './Axios';
import { toast } from 'react-toastify';
import { CONSOLE, MESSAGES } from '../../Constants';

const axiosWithTokenMembers = createAxiosWithToken(globalMembersAPI);
const axiosWithTokenAuth = createAxiosWithToken(globalAuthAPI);

//닉네임 중복 확인
export const fetchUserName = async (
  setIsDuplicate,
  userName,
  setUserName,
  signIn,
  navigate,
) => {
  try {
    const response = await axiosWithTokenAuth.get('/check-nickname', {
      params: {
        nickname: userName,
      },
    });

    if (response.status === 200) {
      toast.success(MESSAGES.USERNAME_AVAILABLE);
      setIsDuplicate(false);
      setUserName(userName);
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 400) {
      toast.error(MESSAGES.USERNAME_DUPLICATE);
      setIsDuplicate(true);
    }
    if (signIn && error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//프로필 변경
export const changeUserInfo = async (userName, address, imgFile, navigate) => {
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

    formData.append('imgFile', imgFile);
    formData.append('memberRequest', blob);

    const response = await axiosWithTokenMembers.put('', formData);

    console.log(response);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    toast.error(MESSAGES.PROFILE_UPDATE_FAILURE);
    if (error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};

//마이페이지 들어왔을때 유저정보 불러오기
export const fetchUserInfo = async navigate => {
  try {
    const response = await axiosWithTokenMembers.get('');
    if (response.status === 200) {
      console.log('API쪽 성공했을때 데이터: ', response.data);
      return response.data;
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

//response.data.rating

//비밀번호 변경
export const changePassword = async (
  oldPassword,
  newPassword,
  setSignIn,
  navigate,
) => {
  try {
    const passwordRequest = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const response = await axiosWithTokenMembers.put(
      '/change-password',
      passwordRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      toast.success(MESSAGES.PASSWORD_UPDATE_SUCCESS);

      // 3초 후에 로그아웃 처리
      setTimeout(() => {
        setSignIn(false);
        localStorage.removeItem('accessToken');
        navigate('/SignUpSignIn');
      }, 3000);

      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    toast.error(MESSAGES.PASSWORD_UPDATE_FAILURE);
    if (error.response && error.response.status === 401) {
      console.log(CONSOLE.RESOURCE_NOT_FOUND_ERROR);
      localStorage.removeItem('accessToken');
      navigate('/signupsignin');
    }
    throw error;
  }
};
