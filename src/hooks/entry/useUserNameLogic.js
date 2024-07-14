import { useEffect, useState } from 'react';
import { fetchUserName } from '../../api/UserInfoAPI';
import { duplicationState, userNameState } from '../../recoil/RecoilUserName';
import { useRecoilState } from 'recoil';
import { signInState } from '../../recoil/RecoilSignIn';
import { useNavigate } from 'react-router-dom';

export const useUserNameLogic = () => {
  const navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useRecoilState(duplicationState);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [userName, setUserName] = useRecoilState(userNameState);

  const handleUserNameChange = (e, setIsDuplicate) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    setIsDuplicate(true); // 중복 확인이 필요함을 표시
  };

  const handleDuplicationCheck = async e => {
    e.preventDefault();
    await fetchUserName(
      setIsDuplicate,
      userName,
      setUserName,
      signIn,
      navigate,
    );
  };

  return {
    // isDuplicate,
    // setIsDuplicate,
    handleUserNameChange,
    handleDuplicationCheck,
  };
};

export default useUserNameLogic;
