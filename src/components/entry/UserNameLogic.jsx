import { useState } from 'react';
import { fetchUserName } from '../../api/UserInfoAPI';
import { userNameState } from '../../recoil/RecoilUserName';
import { useRecoilState } from 'recoil';
import { signInState } from '../../recoil/RecoilSignIn';

const UserNameLogic = () => {
  const [userName, setUserName] = useRecoilState(userNameState);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [signIn, setSignIn] = useRecoilState(signInState);

  const handleUserNameChange = e => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    setIsDuplicate(false); // Reset duplicate status on new input
  };

  const handleDuplicationCheck = async e => {
    e.preventDefault();
    await fetchUserName(
      setIsDuplicate,
      userName,
      setUserName,
      signIn,
      setSignIn,
    );
  };

  return {
    isDuplicate,
    setIsDuplicate,
    handleUserNameChange,
    handleDuplicationCheck,
  };
};

export default UserNameLogic;
