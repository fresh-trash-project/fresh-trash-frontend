import { globalMailAPI } from '../../variable';
import { globalAuthAPI } from '../../variable';
import createAxiosWithToken from './Axios';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../Constants';

const axiosWithTokenMail = createAxiosWithToken(globalMailAPI);
const axiosWithTokenAuth = createAxiosWithToken(globalAuthAPI);

// 이메일 인증버튼 눌렀을때 인증코드 받기
export const fetchCode = async email => {
  try {
    const response = await axiosWithTokenMail.post(`/send-code`, {
      email: email,
    });

    if (response.status === 200) {
      if (!toast.isActive('send-code-success')) {
        toast.success(MESSAGES.SEND_CODE_SUCCESS, {
          toastId: 'send-code-success',
        });
      }

      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 400) {
      if (!toast.isActive('invalid-email')) {
        toast.error(MESSAGES.INVALID_EMAIL_ERROR, {
          toastId: 'invalid-email',
        });
      }
    }
    throw error;
  }
};

// 인증 코드 입력하고 확인버튼 눌렀을때
export const verifyCode = async (email, code) => {
  try {
    const response = await axiosWithTokenMail.post(`/verify`, {
      email: email,
      code: code,
    });

    if (response.status === 200) {
      if (!toast.isActive('verify-success')) {
        toast.success(MESSAGES.VERIFY_SUCCESS, {
          toastId: 'verify-success',
        });
      }

      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 400) {
      if (!toast.isActive('invalid-code-error')) {
        toast.error(MESSAGES.INVALID_CODE_ERROR, {
          toastId: 'invalid-code-error',
        });
      }
    }
    throw error;
  }
};

// 회원가입 버튼 눌렀을때
export const signUpAccount = async (
  setSignIn,
  setSignInPanel,
  userName,
  setUserName,
  password,
  email,
) => {
  try {
    const response = await axiosWithTokenAuth.post('/signup', {
      nickname: userName,
      password: password,
      email: email,
    });

    if (response.status === 201) {
      if (!toast.isActive('signup-success')) {
        toast.success(MESSAGES.SIGN_UP_SUCCESS, {
          toastId: 'signup-success',
        });
      }

      setSignIn(true);
      setSignInPanel(true);
      setUserName(userName);
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 400) {
      if (!toast.isActive('email-exist')) {
        toast.error(MESSAGES.EMAIL_EXIST_ERROR, {
          toastId: 'email-exist',
        });
      }
    }
    throw error;
  }
};

// 로그인 버튼 눌렀을때
export const signInAccount = async (setSignIn, password, email, navigate) => {
  try {
    const response = await axiosWithTokenAuth.post(`/signin`, {
      password: password,
      email: email,
    });

    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      setSignIn(true);
      navigate('/');
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    if (!toast.isActive('wrong-email-password')) {
      toast.error(MESSAGES.WRONG_EMAIL_AND_PASSWORD, {
        toastId: 'wrong-email-password',
      });
    }

    if (error.response.status === 404) {
      if (!toast.isActive('user-not-found')) {
        toast.error(MESSAGES.USER_NOT_FOUND_ERROR, {
          toastId: 'user-not-found',
        });
      }
    }
    throw error;
  }
};

// 비번 잊었을때 임시비번 전송
export const fetchTempPassword = async email => {
  try {
    const response = await axiosWithTokenMail.post(`/find-pass`, {
      email: email,
    });

    if (response.status === 200) {
      if (!toast.isActive('password-reset-success')) {
        toast.success(MESSAGES.PASSWORD_RESET_SUCCESS, {
          toastId: 'password-reset-success',
        });
      }

      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 400) {
      if (!toast.isActive('password-reset-wrong-email')) {
        toast.error(MESSAGES.PASSWORD_RESET_WRONG_EMAIL, {
          toastId: 'password-reset-wrong-email',
        });
      }
    }
    throw error;
  }
};
