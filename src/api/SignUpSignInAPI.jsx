import axios from 'axios';
import { verificationMessageState } from '../recoil/RecoilUserEmail';
import { useRecoilState } from 'recoil';
import { registerMessageState, signInState } from '../recoil/RecoilSignIn';

// const API = 'http://localhost:3000';
const API = 'http://localhost:8080/api/v1';
// 이메일 인증버튼 눌렀을때 인증코드 받기
export const fetchCode = async () => {
  const [verificationMessage, setVerificationMessage] = useRecoilState(
    verificationMessageState,
  );
  try {
    const response = await axios.post(`${API}/mail/send-code`, {
      email: userEmail,
    });
    console.log(response);

    if (response.status === 200) {
      setVerificationMessage('이메일로 받은 코드를 입력하세요');
    }
  } catch (error) {
    console.error('Error sending verification request: ', error);
    setVerificationMessage('잘못된 이메일 입니다.');
  }
};

// 인증 코드 입력하고 확인버튼 눌렀을때
export const verifyCode = async () => {
  const [verificationMessage, setVerificationMessage] = useRecoilState(
    verificationMessageState,
  );
  const [isVerified, setIsVerified] = useRecoilState(verificationState);
  try {
    const response = await axios.post(`${API}/mail/verify`, {
      email: userEmail,
      code: code,
    });

    if (response.status === 200) {
      setVerificationMessage('이메일이 인증되었습니다.');
      isVerified(true);
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      setVerificationMessage('잘못된 인증코드입니다.');
    }
  }
};

// 회원가입 버튼 눌렀을때
export const signUpAccount = async () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [registerMessage, setRegisterMessage] =
    useRecoilState(registerMessageState);
  try {
    const response = await axios.post(`${API}/auth/signup`, {
      nickname: userName,
      password: userPassword,
      email: userEmail,
    });

    if (response.status === 200) {
      console.log('성공적 회원가입 ');
      setSignIn(true);
      navigate('/');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      registerMessage('페이지를 표시 할 수 없습니다.');
    } else if (error.response && error.response.status === 400) {
      registerMessage('이미 존재하는 이메일 또는 닉네임입니다.');
    } else {
      registerMessage('에러:', error);
    }
  }
};

// 로그인 버튼 눌렀을때
export const signInAccount = async () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [registerMessage, setRegisterMessage] =
    useRecoilState(registerMessageState);
  try {
    const response = await axios.post(`${API}/auth/signin`, {
      password: userPassword,
      email: userEmail,
    });

    if (response.status === 200) {
      console.log('성공적 로그인 ');
      setSignIn(true);
      navigate('/');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('페이지를 표시 할 수 없습니다.');
    } else if (error.response && error.response.status === 400) {
      console.log('이미 존재하는 이메일 또는 닉네임입니다.');
    } else {
      console.error('에러:', error);
    }
  }
};
