import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { signInState } from '../../recoil/RecoilSignIn';
import { fetchTempPassword, signInAccount } from '../../api/EntryAPI';
import Email from '../entry/Email';
import Password from '../entry/Password';
import EntryButton from '../common/button/EntryButton';
import SNSLogIn from '../entry/SNSLogIn';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../Constants';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/button/LanguageSwitcher';

const SignInForm = ({
  email,
  handleEmailChange,
  password,
  setCurrentPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  handlePassword,
  handlePasswordVisibility,
}) => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = async e => {
    e.preventDefault();
    await signInAccount(setSignIn, password, email, navigate);
  };

  const handlePasswordReset = async e => {
    e.preventDefault();
    if (email.length === 0) {
      if (!toast.isActive('write-email')) {
        toast.error(MESSAGES.WRITE_EMAIL, {
          toastId: 'write-email',
        });
      }
    } else {
      await fetchTempPassword(email);
    }
  };

  return (
    <div>
      <div className="md:mb-12">
        <LanguageSwitcher />
      </div>
      <form
        className="flex flex-col items-center py-12 px-12 text-center md:justify-center md:h-full md:py-0"
        onSubmit={handleSignIn}
      >
        <h1 className="font-bold m-0 text-[1.5rem] mb-5">
          {t('SIGN_IN_UPPER_ENG')}
        </h1>
        <Email email={email} handleEmailChange={handleEmailChange} />
        <Password
          password={password}
          showCurrentPassword={showCurrentPassword}
          handlePassword={handlePassword}
          handlePasswordVisibility={handlePasswordVisibility}
        />

        <div className="text-slate-400 mt-4 mb-4 no-underline text-xs w-[23rem] flex justify-end">
          {t('FORGOT_PASSWORD_ENG')}
          <button
            className="ml-1 cursor-pointer hover:text-green-brunswick hover:font-bold"
            onClick={handlePasswordReset}
          >
            {t('CLICK_UPPER_ENG')}
          </button>
        </div>
        <SNSLogIn />
        <EntryButton
          type="submit"
          disabled={email.length === 0 || password.length === 0}
        >
          {t('LOGIN_UPPER_ENG')}
        </EntryButton>
      </form>
    </div>
  );
};

export default SignInForm;
