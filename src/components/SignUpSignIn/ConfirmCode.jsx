import { useState } from 'react';
import VerificationButton from '../common/button/VerificationButton';
import { useRecoilState } from 'recoil';
import { userEmailState } from '../../recoil/RecoilUserEmail';

const ConfirmCode = ({ open, close }) => {
  const [code, setCode] = useState('');
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);

  if (!open) return null;

  //이메일 인증코드 확인 ---------------------------------------
  const handleConfirmation = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/confirmation', {
        email: userEmail,
        code: code,
      });

      if (response.status === 200) {
        console.log('이메일이 인증되었습니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // {
        //   console.log('페이지를 표시 할 수 없습니다.');
        // } else if (error.response && error.response.status === 400) {
        //   console.log('잘못된 인증코드입니다.');
        // } else
        console.error('Error signing up:', error);
      }
    }
  };

  return (
    <div className="mt-1 mb-2">
      <p className="text-blue-400 text-sm">
        이메일로 받은 인증코드를 입력 해 주세요
      </p>
      <label className="input input-bordered flex items-center gap-2 mt-2 mb-2">
        <input
          type="text"
          className="grow border-0 outline-none "
          placeholder="인증 코드"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <VerificationButton
          style="btn btn-sm w-[4rem]"
          pStyle="text-[0.8rem]"
          onClick={handleConfirmation}
        >
          확인
        </VerificationButton>
      </label>
    </div>
  );
};
export default ConfirmCode;
