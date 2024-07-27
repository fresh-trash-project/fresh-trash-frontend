import EntryInput from '../common/input/EntryInput';
import InputButton from '../common/button/InputButton';
import { VscEye } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';

const Password = ({
  password,
  showCurrentPassword,
  handlePassword,
  handlePasswordVisibility,
}) => {
  const { t } = useTranslation();
  const passwordIconPaths = [
    {
      d: 'M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
  ];

  return (
    <div>
      <EntryInput
        iconPaths={passwordIconPaths}
        type={showCurrentPassword ? 'text' : 'password'}
        placeholder={t('PASSWORD')}
        value={password}
        onChange={handlePassword}
        extraButton={
          <InputButton onClick={handlePasswordVisibility} width="w-[4rem]">
            <VscEye />
          </InputButton>
        }
      />
    </div>
  );
};

export default Password;
