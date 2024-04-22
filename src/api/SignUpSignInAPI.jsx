import axios from 'axios';
import { verificationMessageState } from '../recoil/RecoilUserEmail';
import { useRecoilState } from 'recoil';
import { registerMessageState, signInState } from '../recoil/RecoilSignIn';
import { useNavigate } from 'react-router-dom';

// const API = 'http://localhost:3000';
const API = 'http://localhost:8080/api/v1';
// 이메일 인증버튼 눌렀을때 인증코드 받기
export const fetchCode = async (setVerificationMessage, userEmail) => {
  try {
    const response = await axios.post(`${API}/mail/send-code`, {
      email: userEmail,
    });
    console.log(response);

    if (response.status === 200) {
      setVerificationMessage('이메일로 받은 코드를 입력하세요');
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      setVerificationMessage('잘못된 이메일 입니다.');
    } else {
      throw error;
    }
  }
};

// 인증 코드 입력하고 확인버튼 눌렀을때
export const verifyCode = async (
  setVerificationMessage,
  setIsVerified,
  userEmail,
  code,
) => {
  try {
    const response = await axios.post(`${API}/mail/verify`, {
      email: userEmail,
      code: code,
    });

    if (response.status === 200) {
      setVerificationMessage('이메일이 인증되었습니다.');
      setIsVerified(true);
      console.log(response.status);
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      setVerificationMessage('잘못된 인증코드입니다.');
    }
  }
};

// 회원가입 버튼 눌렀을때
export const signUpAccount = async (
  setSignIn,
  setRegisterMessage,
  userName,
  userPassword,
  userEmail,
) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, {
      nickname: userName,
      password: userPassword,
      email: userEmail,
    });

    if (response.status === 201) {
      console.log('성공적 회원가입 ');
      setSignIn(true);
      const navigate = useNavigate();
      navigate('/');
    }
    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 404) {
      setRegisterMessage('페이지를 표시 할 수 없습니다.');
    } else if (error.response.status === 400) {
      setRegisterMessage('이미 존재하는 이메일 또는 닉네임입니다.');
    } else {
      setRegisterMessage('에러:', error);
    }
  }
};

// 로그인 버튼 눌렀을때
export const signInAccount = async (
  setSignIn,
  setRegisterMessage,
  userPassword,
  userEmail,
) => {
  try {
    const response = await axios.post(`${API}/auth/signin`, {
      password: userPassword,
      email: userEmail,
    });

    if (response.status === 200) {
      console.log('성공적 로그인 ');
      setSignIn(true);
      const navigate = useNavigate();
      navigate('/');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 404) {
      setRegisterMessage('페이지를 표시 할 수 없습니다.');
    } else if (error.response.status === 400) {
      setRegisterMessage('이미 존재하는 이메일 또는 닉네임입니다.');
    } else {
      setRegisterMessage('에러:', error);
    }
  }
};
