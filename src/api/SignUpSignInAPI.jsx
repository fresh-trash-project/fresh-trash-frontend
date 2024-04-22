import axios from 'axios';

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
    console.log(error);
    setRegisterMessage('에러');
    //! 에러 세부적으로 나누기
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
    console.log(error);
    setRegisterMessage('에러');
    //! 에러 세부적으로 나누기
  }
};

// 회원가입 버튼 눌렀을때
export const signUpAccount = async (
  setSignIn,
  setRegisterMessage,
  userName,
  userPassword,
  userEmail,
  navigate,
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
      navigate('/');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    //! 에러 세부적으로 나누기
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
    const response = await axios.post(`${API}/auth/signin`, {
      password: userPassword,
      email: userEmail,
    });

    if (response.status === 200) {
      console.log('성공적 로그인 ');
      setSignIn(true);
      navigate('/');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setRegisterMessage('에러');
    //! 에러 세부적으로 나누기
  }
};
