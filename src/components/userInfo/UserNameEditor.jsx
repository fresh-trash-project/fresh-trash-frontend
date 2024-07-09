import { useRecoilState } from 'recoil';
import { userNameState } from '../../recoil/RecoilUserName';
import { useUserNameLogic } from '../../hooks/entry/useUserNameLogic';
import { useTranslation } from 'react-i18next';

const UserNameEditor = ({ isEditing }) => {
  const [userName, setUserName] = useRecoilState(userNameState);
  const { handleUserNameChange, handleDuplicationCheck, isDuplicate } =
    useUserNameLogic();
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <input
        type="text"
        className={'input input-bordered w-1/2'}
        placeholder={t('USER_NAME')}
        value={userName}
        onChange={handleUserNameChange}
        disabled={!isEditing}
      />
      {isEditing && (
        <button
          onClick={handleDuplicationCheck}
          className="btn btn-sm ml-2"
          disabled={!userName}
        >
          {t('DUPLICATION_CHECK')}
        </button>
      )}
    </div>
  );
};

export default UserNameEditor;
