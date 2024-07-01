import { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../Constants';
import { signInState } from '../../recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';
import { changePassword } from '../../api/UserInfoAPI';
import { useNavigate } from 'react-router-dom';

const passwordLogic = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const navigate = useNavigate();

  const handlePassword =
    (setter, validate = false) =>
    e => {
      setter(e.target.value);
      if (validate) {
        validatePassword(e.target.value);
      }
    };

  const handlePasswordVisibility = setter => e => {
    e.preventDefault();
    setter(prev => !prev);
  };

  const validatePassword = newPassword => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      if (!toast.isActive('password-error')) {
        toast.error(MESSAGES.INVALID_PASSWORD, { toastId: 'password-error' });
      }
    }
    return passwordRegex.test(newPassword);
  };

  // 비밀번호 변경
  const handlePasswordChange = async e => {
    if (newPassword !== confirmPassword) {
      if (!toast.isActive('password-not-match')) {
        toast.error(MESSAGES.NEW_PASSWORD_NOT_MATCH, {
          toastId: 'password-not-match',
        });
      }
      return;
    }

    try {
      await changePassword(currentPassword, newPassword, setSignIn, navigate);
    } catch (error) {
      console.log('비밀번호 변경 오류:', error);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    handlePassword,
    handlePasswordChange,
    handlePasswordVisibility,
    validatePassword,
  };
};

export default passwordLogic;
