import { userNameState } from '../../recoil/RecoilUserName';
import useUserNameLogic from '../../hooks/entry/useUserNameLogic';
import EntryInput from '../common/input/EntryInput';
import InputButton from '../common/button/InputButton';
import { useRecoilState } from 'recoil';

const UserName = () => {
  const [userName, setUserName] = useRecoilState(userNameState);
  const { handleUserNameChange, handleDuplicationCheck } = useUserNameLogic();
  const userNameIconPaths = [
    {
      d: 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z',
    },
  ];
  return (
    <div>
      <EntryInput
        iconPaths={userNameIconPaths}
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={handleUserNameChange}
        extraButton={
          <InputButton
            width="w-[5rem]"
            onClick={handleDuplicationCheck}
            disabled={!userName}
          >
            중복확인
          </InputButton>
        }
      />
    </div>
  );
};

export default UserName;
