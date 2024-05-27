import { useState } from 'react';
import { toast } from 'react-toastify';
import { signInPanelState } from '../../recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';

const passwordLogic = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);

  const handlePasswordChange = e => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handlePasswordVisibility = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!signInPanel && !passwordRegex.test(password)) {
      if (!toast.isActive('password-error')) {
        toast.error(
          '영어소문자, 숫자, 특수문자가 포함된 8자리 이상의 비밀번호로 넣어주세요.',
          { toastId: 'password-error' },
        );
      }
    }
  };

  return {
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handlePasswordChange,
    handlePasswordVisibility,
  };
};

export default passwordLogic;
