import { useRecoilState } from 'recoil';
import { signInPanelState, signInState } from '../../../recoil/RecoilSignIn';
import { userNameState } from '../../../recoil/RecoilUserName';
import { signUpAccount } from '../../../api/EntryAPI';
import Email from '../../entry/Email';
import Password from '../../entry/Password';
import UserName from '../../entry/UserName';
import EntryButton from '../button/EntryButton';
import UserNameLogic from '../../entry/UserNameLogic';

const SignUpForm = ({
  email,
  code,
  setCode,
  codeSent,
  confirmed,
  handleEmailChange,
  handleSendCode,
  handleVerifyCode,
  password,
  showPassword,
  handlePasswordChange,
  handlePasswordVisibility,
}) => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const { isDuplicate, setIsDuplicate } = UserNameLogic();

  const handleSignUp = async e => {
    e.preventDefault();
    await signUpAccount(
      setSignIn,
      setSignInPanel,
      userName,
      setUserName,
      password,
      email,
    );
  };

  return (
    <form className="flex flex-col items-center py-16 px-12 text-center md:justify-center md:h-full md:py-0">
      <h1 className="font-bold m-0 text-[1.5rem] mb-5">CREATE ACCOUNT</h1>
      <Email
        showVerificationButton={true}
        email={email}
        code={code}
        setCode={setCode}
        codeSent={codeSent}
        confirmed={confirmed}
        handleEmailChange={handleEmailChange}
        handleSendCode={handleSendCode}
        handleVerifyCode={handleVerifyCode}
      />
      <Password
        password={password}
        showPassword={showPassword}
        handlePasswordChange={handlePasswordChange}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      <UserName />
      <EntryButton
        onClick={handleSignUp}
        disabled={
          !confirmed ||
          password.length === 0 ||
          userName.length === 0 ||
          isDuplicate
        }
      >
        회원 가입
      </EntryButton>
    </form>
  );
};

export default SignUpForm;
