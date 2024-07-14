import { useRecoilState } from 'recoil';
import { signInPanelState, signInState } from '../../recoil/RecoilSignIn';
import { duplicationState, userNameState } from '../../recoil/RecoilUserName';
import { signUpAccount } from '../../api/EntryAPI';
import Email from '../entry/Email';
import Password from '../entry/Password';
import UserName from '../entry/UserName';
import EntryButton from '../common/button/EntryButton';
import useUserNameLogic from '../../hooks/entry/useUserNameLogic';
import usePasswordLogic from '../../hooks/entry/usePasswordLogic';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../Constants';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/button/LanguageSwitcher';

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
  setCurrentPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  handlePassword,
  handlePasswordVisibility,
  validatePassword,
}) => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [isDuplicate, setIsDuplicate] = useRecoilState(duplicationState);
  const { handleUserNameChange, handleDuplicationCheck } = useUserNameLogic();
  const { t } = useTranslation();

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
    <div>
      <div className="md:mb-12 ml-1 mt-1">
        <LanguageSwitcher padding="px-2 py-2 lg:py-1" />
      </div>
      <form
        className="flex flex-col items-center py-12 px-12 text-center md:justify-center md:h-full md:py-0"
        onSubmit={handleSignUp}
      >
        <h1 className="font-bold m-0 text-[1.5rem] mb-5">
          {t('CREATE_ACCOUNT_UPPER_ENG')}
        </h1>
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
          showCurrentPassword={showCurrentPassword}
          handlePassword={handlePassword}
          handlePasswordVisibility={handlePasswordVisibility}
        />

        <UserName
          handleUserNameChange={handleUserNameChange}
          handleDuplicationCheck={handleDuplicationCheck}
        />
        <EntryButton
          type="submit"
          disabled={
            !confirmed ||
            password.length === 0 ||
            validatePassword(password) === false ||
            userName.length === 0 ||
            isDuplicate
          }
        >
          {t('SIGN_UP_UPPER_ENG')}
        </EntryButton>
      </form>
    </div>
  );
};

export default SignUpForm;
