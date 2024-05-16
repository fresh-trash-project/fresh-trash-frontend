import { globalMailAPI } from '../../variable';
import { globalAuthAPI } from '../../variable';
import createAxiosWithToken from './Axios';

const axiosWithTokenMail = createAxiosWithToken(globalMailAPI);
const axiosWithTokenAuth = createAxiosWithToken(globalAuthAPI);

// 이메일 인증버튼 눌렀을때 인증코드 받기
export const fetchCode = async (setVerificationMessage, userEmail) => {
  try {
    const response = await axiosWithTokenMail.post(`/send-code`, {
      email: userEmail,
    });

    if (response.status === 200) {
      setVerificationMessage('이메일로 받은 코드를 입력하세요');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setVerificationMessage('에러');
    if (error.response.status === 400) {
      setVerificationMessage('잘못된 이메일입니다.');
    }
    throw error;
  }
};

// 인증 코드 입력하고 확인버튼 눌렀을때
export const verifyCode = async (
  setConfirmMessage,
  setIsConfirmed,
  userEmail,
  code,
  setVerificationButtonClick,
) => {
  try {
    const response = await axiosWithTokenMail.post(`/verify`, {
      email: userEmail,
      code: code,
    });

    if (response.status === 200) {
      setIsConfirmed(true);
      setVerificationButtonClick(false);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setConfirmMessage('에러');
    if (error.response.status === 400) {
      setConfirmMessage('잘못된 인증코드입니다.');
    }
    throw error;
  }
};

// 회원가입 버튼 눌렀을때
export const signUpAccount = async (
  setSignIn,
  setRegisterMessage,
  userName,
  setUserName,
  userPassword,
  userEmail,
  setSignInPanel,
) => {
  try {
    const response = await axiosWithTokenAuth.post('/signup', {
      nickname: userName,
      password: userPassword,
      email: userEmail,
    });

    if (response.status === 201) {
      console.log('성공적 회원가입 ');
      setSignIn(true);
      setUserName(userName);
      setSignInPanel(true);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    if (error.response.status === 400) {
      setRegisterMessage(error.message);
    }
    throw error;
  }
};

// 로그인 버튼 눌렀을때
export const signInAccount = async (
  setSignIn,
  setRegisterMessage,
  userPassword,
  userEmail,
  navigate,
) => {
  try {
    const response = await axiosWithTokenAuth.post(`/signin`, {
      password: userPassword,
      email: userEmail,
    });

    if (response.status === 200) {
      console.log(response.data);
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      console.log(localStorage);
      console.log('성공적 로그인 ');
      setSignIn(true);
      navigate('/');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    if (error.response.status === 404) {
      setRegisterMessage('유저 정보가 존재하지 않습니다.');
    }
    throw error;
  }
};

//!비번을 잊었을때 아직 백 구현 안됨
export const fetchPW = async (setVerificationMessage, userEmail) => {
  try {
    const response = await axiosWithTokenMail.post(`/find-pass`, {
      email: userEmail,
    });

    if (response.status === 200) {
      setVerificationMessage('이메일로 받은 코드를 입력하세요');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setVerificationMessage('에러');
    if (error.response.status === 400) {
      setVerificationMessage('잘못된 이메일입니다.');
    }
    throw error;
  }
};
