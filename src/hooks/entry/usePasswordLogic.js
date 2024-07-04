import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../Constants';
import { signInState } from '../../recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';
import { changePassword } from '../../api/UserInfoAPI';
import { useNavigate } from 'react-router-dom';

const usePasswordLogic = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const navigate = useNavigate();

  const handlePassword = (setter, validate) => e => {
    const value = e.target.value;
    setter(value);

    if (!validate && !validatePassword(value)) {
      if (!toast.isActive('password-error')) {
        toast.error(MESSAGES.INVALID_PASSWORD, { toastId: 'password-error' });
      }
    } else {
      // 유효성 검사를 통과한 경우
      toast.dismiss('password-error');
    }
  };

  const handlePasswordVisibility = setter => e => {
    e.preventDefault();
    setter(prev => !prev);
  };

  const validatePassword = newPassword => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(newPassword);
  };

  // 새로 만든 비번이 Match하는지
  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      if (!toast.isActive('password-not-match')) {
        toast.error(MESSAGES.NEW_PASSWORD_NOT_MATCH, {
          toastId: 'password-not-match',
        });
      }
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword
    ) {
      // newPassword와 confirmPassword가 같은 경우, 즉 정상적인 경우
      // 이미 표시된 'password-not-match' 토스트가 있으면 제거
      toast.dismiss('password-not-match');
    }
  }, [newPassword, confirmPassword, toast]);

  // 새 비번 다시 확인
  const handlePasswordConfirm = setter => e => {
    const value = e.target.value;
    setter(value);
  };

  // 비밀번호 변경
  const handlePasswordChange = async e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      if (!toast.isActive('password-not-match')) {
        toast.error(MESSAGES.NEW_PASSWORD_NOT_MATCH, {
          toastId: 'password-not-match',
        });
      }
      return;
    }
    await changePassword(currentPassword, newPassword, setSignIn, navigate);
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
    handlePasswordConfirm,
  };
};

export default usePasswordLogic;
