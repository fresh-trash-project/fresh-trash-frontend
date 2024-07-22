import { VscEye } from 'react-icons/vsc';
import usePasswordLogic from '../../hooks/entry/usePasswordLogic';
import { useTranslation } from 'react-i18next';

const PasswordEditor = ({ isEditing, navigate }) => {
  const { t } = useTranslation();
  const {
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
  } = usePasswordLogic();

  return (
    <div>
      <div className="flex items-center">
        <label className="input input-bordered mb-2 w-2/3 flex">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder={t('CURRENT_PASSWORD')}
            className="w-full border-none focus:ring-0"
            disabled={!isEditing}
            value={currentPassword}
            onChange={handlePassword(setCurrentPassword, true)}
          />

          <button onClick={handlePasswordVisibility(setShowCurrentPassword)}>
            <VscEye />
          </button>
        </label>
      </div>

      <div className="flex items-center">
        <label className="input input-bordered mb-2 w-2/3 flex">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder={t('NEW_PASSWORD')}
            className="w-full border-none focus:ring-0"
            disabled={!isEditing}
            value={newPassword}
            onChange={handlePassword(setNewPassword, false)}
          />

          <button onClick={handlePasswordVisibility(setShowNewPassword)}>
            <VscEye />
          </button>
        </label>
      </div>

      <div className="flex items-center">
        <label className="input input-bordered mb-2 w-2/3 flex">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('CONFIRM_PASSWORD')}
            className="w-full border-none focus:ring-0"
            disabled={!isEditing}
            value={confirmPassword}
            onChange={handlePasswordConfirm(setConfirmPassword)}
          />

          <button onClick={handlePasswordVisibility(setShowConfirmPassword)}>
            <VscEye />
          </button>
        </label>
        <button
          className="btn btn-sm ml-2"
          onClick={e => handlePasswordChange(e)}
          disabled={
            currentPassword === '' ||
            newPassword === '' ||
            confirmPassword === '' ||
            newPassword !== confirmPassword ||
            !validatePassword(newPassword)
          }
        >
          {t('SAVE')}
        </button>
      </div>
    </div>
  );
};

export default PasswordEditor;
