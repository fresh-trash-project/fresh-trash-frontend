import { useEffect, useState } from 'react';
import { fetchUserName } from '../../api/UserInfoAPI';
import { userNameState } from '../../recoil/RecoilUserName';
import { useRecoilState } from 'recoil';
import { signInState } from '../../recoil/RecoilSignIn';
import { useNavigate } from 'react-router-dom';

export const useUserNameLogic = () => {
  const navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useState(true);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [userName, setUserName] = useRecoilState(userNameState);

  const handleUserNameChange = e => {
    const newUserName = e.target.value;
    setUserName(newUserName);
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
    isDuplicate,
    setIsDuplicate,
    handleUserNameChange,
    handleDuplicationCheck,
  };
};

export default useUserNameLogic;
