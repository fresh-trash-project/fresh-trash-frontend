import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { signInState } from '../../../recoil/RecoilSignIn';
import { fetchTempPassword, signInAccount } from '../../../api/EntryAPI';
import Email from '../../entry/Email';
import Password from '../../entry/Password';
import EntryButton from '../button/EntryButton';
import SNSLogIn from '../../entry/SNSLogIn';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../Constants';

const SignInForm = ({
  email,
  handleEmailChange,
  password,
  showPassword,
  handlePasswordChange,
  handlePasswordVisibility,
}) => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const navigate = useNavigate();

  const handleSignIn = async e => {
    e.preventDefault();
    await signInAccount(setSignIn, password, email, navigate);
  };

  const handlePasswordReset = async e => {
    e.preventDefault();
    if (email.length === 0) {
      toast.error(MESSAGES.WRITE_EMAIL);
    } else {
      await fetchTempPassword(email);
    }
  };

  return (
    <form className="flex flex-col items-center py-16 px-12 text-center md:justify-center md:h-full md:py-0">
      <h1 className="font-bold m-0 text-[1.5rem] mb-5">SIGN IN</h1>
      <Email email={email} handleEmailChange={handleEmailChange} />
      <Password
        password={password}
        showPassword={showPassword}
        handlePasswordChange={handlePasswordChange}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      <div className="text-slate-400 mt-4 mb-4 no-underline text-xs w-[23rem] flex justify-end">
        Forgot your password?
        <button
          className="ml-1 cursor-pointer hover:text-green-brunswick hover:font-bold"
          onClick={handlePasswordReset}
        >
          CLICK
        </button>
      </div>
      <SNSLogIn />
      <EntryButton
        onClick={handleSignIn}
        disabled={email.length === 0 || password.length === 0}
      >
        로그인
      </EntryButton>
    </form>
  );
};

export default SignInForm;
