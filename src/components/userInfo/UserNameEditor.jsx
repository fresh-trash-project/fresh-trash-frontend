import { useRecoilState } from 'recoil';
import { userNameState } from '../../recoil/RecoilUserName';
import { UserNameLogic } from '../entry/UserNameLogic';

const UserNameEditor = ({ isEditing }) => {
  const [userName, setUserName] = useRecoilState(userNameState);
  const { handleUserNameChange, handleDuplicationCheck, isDuplicate } =
    UserNameLogic();

  return (
    <div className="flex items-center">
      <input
        type="text"
        className={'input input-bordered w-1/2'}
        placeholder="닉네임"
        value={userName}
        onChange={handleUserNameChange}
        disabled={!isEditing}
      />
      {isEditing && (
        <button
          onClick={handleDuplicationCheck}
          className="btn btn-sm ml-2"
          disabled={!userName || isDuplicate}
        >
          중복확인
        </button>
      )}
    </div>
  );
};

export default UserNameEditor;
