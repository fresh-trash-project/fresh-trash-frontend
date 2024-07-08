import { useRecoilState } from 'recoil';
import { signInPanelState, signInState } from '../recoil/RecoilSignIn';
import SignUpForm from '../components/form/SignUpForm';
import SignInForm from '../components/form/SignInForm';
import usePasswordLogic from '../hooks/entry/usePasswordLogic';
import useEmailLogic from '../hooks/entry/useEmailLogic';
import SwitchPanel from '../components/entry/SwitchPanel';
import EntryContainer from '../components/entry/EntryContainer';

const SignUpSignIn = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);
  const {
    email,
    code,
    setCode,
    codeSent,
    confirmed,
    handleEmailChange,
    handleSendCode,
    handleVerifyCode,
  } = useEmailLogic();
  const {
    currentPassword,
    setCurrentPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    handlePassword,
    handlePasswordVisibility,
    validatePassword,
  } = usePasswordLogic();
  // useUserNameLogic은 SignUpForm에서만 필요하니까 SignUpForm에서 import해서 prop drilling을 줄였다.

  // CSS에서 rem 단위는 html 태그의 폰트 사이즈를 기준으로 삼기 때문에, html 폰트 사이즈를 변경하면 rem을 사용하는 모든 요소의 크기가 영향을 받는다.
  return (
    <div className="outerContainer w-full h-screen flex justify-center items-center shadow-2xl ">
      <style>
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

      <div className="container rounded-xl shadow-2xl relative overflow-hidden w-[30rem] max-w-full min-h-[45rem] md:w-[60rem] md:min-h-[35rem]">
        {/* 회원가입컨테이너--------------------------------------------------------------------------------------------------- */}
        <EntryContainer
          signInPanel={false}
          translation={`${signInPanel ? 'translate-x-0 opacity-0 z-0' : 'md:translate-x-full opacity-1 z-10'}`}
          title="WELCOME"
          phrase="We invite you to FRESH TRASH"
          buttonText="Already have an account ?"
          onClick={() => setSignInPanel(true)}
        >
          <SignUpForm
            email={email}
            code={code}
            setCode={setCode}
            codeSent={codeSent}
            confirmed={confirmed}
            handleEmailChange={handleEmailChange}
            handleSendCode={handleSendCode}
            handleVerifyCode={handleVerifyCode}
            password={currentPassword}
            setCurrentPassword={setCurrentPassword}
            showCurrentPassword={showCurrentPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            handlePassword={e => handlePassword(setCurrentPassword, false)(e)}
            handlePasswordVisibility={e =>
              handlePasswordVisibility(setShowCurrentPassword)(e)
            }
            validatePassword={validatePassword}
          />
        </EntryContainer>

        {/* 로그인컨테이너--------------------------------------------------------------------------------------------------- */}
        <EntryContainer
          signInPanel={true}
          translation={`${signInPanel ? 'translate-x-0 opacity-1 z-10' : 'md:translate-x-full opacity-0 z-0'}`}
          title="WELCOME BACK"
          phrase="It's time to FRESH TRASH"
          buttonText="Don't have an account ?"
          onClick={() => setSignInPanel(false)}
        >
          <SignInForm
            email={email}
            handleEmailChange={handleEmailChange}
            password={currentPassword}
            setCurrentPassword={setCurrentPassword}
            showCurrentPassword={showCurrentPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            handlePassword={e => handlePassword(setCurrentPassword, true)(e)}
            handlePasswordVisibility={e =>
              handlePasswordVisibility(setShowCurrentPassword)(e)
            }
          />
        </EntryContainer>

        {/* 큰화면 스위치컨테이너----------------------------------------------------------------------------------------------------*/}
        <div
          className={`switchContainer z-10 absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all ${!signInPanel && '-translate-x-full'} hidden md:block`}
        >
          <div
            className={`greenContainer bg-green-brunswick relative -left-full h-full w-[200%] text-white ${signInPanel ? 'translate-x-0' : 'translate-x-1/2'}`}
          >
            <div className="Panel absolute top-0 text-center h-full w-1/2 flex items-center justify-center flex-col px-10 ">
              <SwitchPanel
                signInPanel={false}
                translation={`${signInPanel ? 'translate-x-[30rem] opacity-0 z-0' : 'translate-x-0 opacity-1 z-10'}`}
                title="WELCOME"
                phrase="We invite you to Fresh Trash"
                buttonText="Already have an account ?"
                onClick={() => setSignInPanel(true)}
              />

              <SwitchPanel
                signInPanel={true}
                translation={`${signInPanel ? 'translate-x-[30rem] opacity-1 z-10' : 'translate-x-0 opacity-0 z-0'}`}
                title="WELCOME BACK"
                phrase="It's time to Fresh Trash"
                buttonText="Don't have an account?"
                onClick={() => setSignInPanel(false)}
              />
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
