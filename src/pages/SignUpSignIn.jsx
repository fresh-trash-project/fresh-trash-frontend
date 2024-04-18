import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { VscEye } from 'react-icons/vsc';
import { Google, Naver, Kakao } from '../components/common/service/SNS';
import VerificationButton from '../components/common/button/VerificationButton';
import DuplicationButton from '../components/common/button/DuplicationButton';
import { useRecoilState } from 'recoil';
import {
  userNameState,
  duplicationState,
  duplicationMessageState,
} from '../recoil/RecoilUserName';
import { userEmailState } from '../recoil/RecoilUserEmail';
import ConfirmCode from '../components/SignUpSignIn/ConfirmCode';
import { GoogleLoginButton } from '../fetchCall/OAuth';

const SignUpSignIn = () => {
  const [signIn, setSignIn] = useState(true);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [isDuplicate, setIsDuplicate] = useRecoilState(duplicationState);
  const [duplicationMessage, setDuplicationMessage] = useRecoilState(
    duplicationMessageState,
  );
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [click, setClick] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);

  const navigate = useNavigate();

  // 함수--------------------------------------------------------------------------------------
  const close = e => {
    e.preventDefault();
    setOpenVerification(false);
  };
  // 이메일 -----------------------------------------------
  const handleEmailChange = e => {
    e.preventDefault();
    setClick(false); //인증버튼 한번 누르면 계속 true인상태가 되서 이메일 쓸때 다시 false로 바꿈
    setUserEmail(e.target.value);
  };

  const noEmailMessage = userEmail ? null : (
    <p className="text-red-500">이메일을 입력해 주세요.</p>
  );

  // 이메일 인증 --------------------------------------
  const handleVerification = async e => {
    e.preventDefault();
    setClick(true);
    setOpenVerification(true);

    if (!userEmail) {
      console.log('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/verification', {
        email: userEmail,
      });

      if (response.status === 200) {
        setVerificationMessage('이메일로 받은 코드를 입력하세요');
      }
    } catch (error) {
      console.error('Error sending verification request: ', error);
    }
  };

  // 비밀번호 버튼 ---------------------------------------
  const handlePasswordVisibility = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = e => {
    e.preventDefault();
    setUserPassword(e.target.value);
  };

  // 닉네임 중복확인 버튼 ---------------------------------------
  const handleDuplication = async (e, userName) => {
    e.preventDefault();
    setClick(true);

    try {
      const response = await axios.get('http://localhost:3000/usernames', {
        params: {
          nickname: userName,
        },
      });

      console.log(response);

      if (response.status === 200) {
        if (response.data.some(user => user.nickname === userName)) {
          setDuplicationMessage('중복된 닉네임입니다.');
          setIsDuplicate(true);
        } else if (response.data.every(user => user.nickname !== userName)) {
          setDuplicationMessage('사용 가능한 닉네임입니다.');
          setIsDuplicate(false);
        }
      }
    } catch (error) {
      console.error('Error checking duplicate username: ', error);
    }
    console.log(duplicationMessage);
  };

  const handleUserNameChange = e => {
    e.preventDefault();
    setClick(false);
    setUserName(e.target.value);
    setIsDuplicate(false);
    setDuplicationMessage('');
  };

  // 회원가입 버튼 ---------------------------------------
  // const history = useHistory();

  const handleSignUp = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        nickname: userName,
        password: userPassword,
        email: userEmail,
      });

      if (response.status === 200) {
        // Redirect to the home page
        // history.push('/');
        console.log('성공적 회원가입 ');
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('페이지를 표시 할 수 없습니다.');
      } else if (error.response && error.response.status === 400) {
        console.log('이미 존재하는 이메일 또는 닉네임입니다.');
      } else {
        console.error('Error signing up:', error);
      }
    }
  };

  // 로그인 버튼 --------------------------------------

  const handleSignIn = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signin', {
        password: userPassword,
        email: userEmail,
      });

      if (response.status === 200) {
        console.log('성공적 로그인');
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  //-------------------------------------------------------------------------------------------
  return (
    <div className="outerContainer w-full h-screen flex justify-center items-center shadow-2xl">
      <style jsx>
        {`
          @media screen and (max-width: 1024px) {
            html {
              font-size: 14px;
            }
          }
          @media screen and (max-width: 768px) {
            html {
              font-size: 12px;
            }
          }
        `}
      </style>

      <div className="container rounded-xl shadow-2xl relative overflow-hidden w-[60rem] max-w-full min-h-[35rem]">
        {/* 회원가입---------------------------------------------------------------------------------------------------- */}
        <div
          signIn={signIn}
          className={`signUpContainer absolute top-0 left-0 h-full w-1/2 transition-all ${signIn ? 'translate-x-0 opacity-0 z-0' : 'translate-x-full opacity-1 z-10'}`}
        >
          <form className="flex flex-col items-center justify-center pr-12 pl-12 h-full text-center">
            <h1 className="font-bold m-0 text-[1.5rem] mb-5">CREATE ACCOUNT</h1>
            <label className="input input-bordered flex items-center gap-2 mt-2 mb-2 w-[23rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow border-0 outline-none"
                placeholder="Email"
                onChange={handleEmailChange}
              />
              <VerificationButton
                style="btn btn-sm w-[4rem]"
                pStyle="text-[0.8rem]"
                onClick={handleVerification}
              >
                인증
              </VerificationButton>
            </label>
            {/* //! 이부분 수정필요한듯.// */}
            {click &&
              (userEmail ? (
                <ConfirmCode
                  open={setOpenVerification}
                  close={() => {
                    setOpenVerification(false);
                  }}
                />
              ) : (
                <p className="text-red-400">이메일을 입력해 주세요.</p>
              ))}
            <label className="input input-bordered flex items-center gap-2 mt-2 mb-2 w-[23rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                className="grow border-0"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <button
                onClick={handlePasswordVisibility}
                className="btn btn-sm w-[4rem]"
              >
                <p className="text-[0.8rem]">
                  <VscEye />
                </p>
              </button>
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-2 mb-2 w-[23rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow border-0 outline-none "
                placeholder={userName}
                onChange={handleUserNameChange}
              />
              <DuplicationButton
                style="btn btn-sm ml-2"
                pStyle="text-[0.8rem] leading-tight"
                onClick={e => handleDuplication(e, userName)}
              />
            </label>
            <div
              className={`w-full flex justify-end ${duplicationMessage === '중복된 닉네임입니다.' ? 'text-red-500' : 'text-blue-500'}`}
            >
              {duplicationMessage}
            </div>
            {/* //! 버튼 */}
            <button
              className="btn w-[23rem] mt-14"
              onClick={handleSignUp}
              disabled={!confirm || !click || isDuplicate}
            >
              회원 가입
            </button>
          </form>
        </div>

        {/* 로그인---------------------------------------------------------------------------------------------------- */}
        <div
          signIn={signIn}
          className={`signInContainer absolute top-0 left-0 h-full w-1/2 transition-all ${signIn ? 'translate-x-0 opacity-1 z-10' : 'translate-x-full opacity-0 z-0'}`}
        >
          <form className="flex flex-col items-center justify-center pr-12 pl-12 h-full text-center">
            <h1 className="font-bold m-0 text-[1.5rem]  mb-5">SIGN IN</h1>
            <label className="input input-bordered flex items-center gap-2 mt-2 mb-2 w-[23rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow border-0"
                placeholder="Email"
                onChange={handleEmailChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-2 mb-0 w-[23rem] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                className="grow border-0"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <button
                onClick={handlePasswordVisibility}
                className="btn btn-sm w-[4rem]"
              >
                <p className="text-[0.8rem]">
                  <VscEye />
                </p>
              </button>
            </label>
            <div className="text-slate-400 mt-4 mb-4 no-underline text-xs w-[23rem] flex justify-end">
              Forgot your password?
              <span
                className="ml-1 cursor-pointer hover:text-green-brunswick hover:font-bold"
                onClick={handleVerification}
              >
                {' '}
                CLICK{' '}
              </span>
            </div>
            {click &&
              (userEmail ? (
                <p className="text-blue-400 mb-4">이메일을 확인해 주세요.</p>
              ) : (
                <p className="text-red-400 mb-4">
                  이메일을 입력하고 CLICK을 눌러주세요.
                </p>
              ))}

            <div className="snsIcons flex w-full">
              <div className="cursor-pointer shadow-md border border-green-brunswick p-2 rounded-full mr-1">
                <Google style="w-4 h-4" onClick={GoogleLoginButton} />
                {/* //!소셜로그인 부분  */}
              </div>
              <div className="cursor-pointer shadow-md border border-green-brunswick p-2 rounded-full mr-1">
                <Naver style="w-4 h-4" />
              </div>
              <div className="cursor-pointer shadow-md border border-green-brunswick p-2 rounded-full mr-1">
                <Kakao style="w-4 h-4" />
              </div>
            </div>
            <button
              onClick={handleSignIn}
              className="btn w-[23rem] mt-14"
              disabled={!userEmail || !userPassword}
            >
              로그인
            </button>
          </form>
        </div>

        {/* 스위치컨테이너---------------------------------------------------------------------------------------------------- */}
        <div
          signIn={signIn}
          className={`switchContainer absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all ${!signIn && '-translate-x-full'}`}
        >
          <div
            signIn={signIn}
            className={`greenContainer bg-green-brunswick  relative -left-full h-full w-[200%] text-white transition-all ${signIn ? 'translate-x-0' : 'translate-x-1/2'}`}
          >
            <div className="Panel absolute top-0 text-center h-full w-1/2 flex items-center justify-center flex-col pl-10 pr-10 transition-all translate-x-0">
              <div
                signIn={signIn}
                className={`leftPanel absolute ${signIn ? 'translate-x-[30rem] opacity-1 z-10' : 'translate-x-0 opacity-0 z-0'}`}
              >
                <h1 className="text-2xl font-bold">WELCOME BACK</h1>
                <p className="mt-5 mb-14">It's time to Fresh Trash</p>
                <div className="switch flex">
                  <p className="mr-2 text-sm">Don't have an account?</p>
                  <button
                    onClick={() => setSignIn(false)}
                    className="btn btn-xs bg-transparent"
                  >
                    <p className="text-white">sign up</p>
                  </button>
                </div>
              </div>

              <div
                signIn={signIn}
                className={`rightPanel absolute ${signIn ? 'translate-x-[30rem] opacity-0 z-0' : 'translate-x-0 opacity-1 z-10'}`}
              >
                <h1 className="text-2xl font-bold">WELCOME</h1>
                <p className="mt-5 mb-14">We invite you to Fresh Trash</p>
                <div className="switch flex">
                  <p className="mr-2 text-sm">Already have an account?</p>
                  <button
                    onClick={() => setSignIn(true)}
                    className="btn btn-xs bg-transparent"
                  >
                    <p className="text-white">sign in</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpSignIn;

/* 정리 

회원가입, 로그인이 absolute으로 같은 위치에 있다가 이동할때도 같이 이동. z-index와 opacity로 보이고 안보이고 차이. 
즉, 움직이는건 같이 움직이되 z-index와 opacity로 조절. 

회원가입
${signIn ? 'translate-x-0 opacity-0 z-0' : 'opacity-1 translate-x-full z-10'}

로그인
${signIn ? 'translate-x-0 opacity-1 z-10' : 'translate-x-full opacity-0 z-0'}


로그인 -> 회원가입으로
${signIn ? 'translate-x-[22rem] opacity-1 z-10' : 'translate-x-0 opacity-0 z-0'}

회원가입 -> 로그인으로 
${signIn ? 'translate-x-[22rem] opacity-0 z-0' : 'translate-x-0 opacity-1 z-10'}


*/
