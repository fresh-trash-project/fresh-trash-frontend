import { useState } from 'react';
import { fetchCode, verifyCode } from '../../api/EntryAPI';

const useEmailLogic = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleEmailChange = e => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleSendCode = async e => {
    e.preventDefault();
    await fetchCode(email);
    setCodeSent(true);
  };

  const handleVerifyCode = async e => {
    e.preventDefault();
    await verifyCode(email, code, setConfirmed);
  };

  return {
    email,
    code,
    setCode,
    codeSent,
    confirmed,
    handleEmailChange,
    handleSendCode,
    handleVerifyCode,
  };
};

export default useEmailLogic;
