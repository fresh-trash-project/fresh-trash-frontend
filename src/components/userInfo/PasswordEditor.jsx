import { VscEye } from 'react-icons/vsc';
import usePasswordLogic from '../../hooks/entry/usePasswordLogic';

const PasswordEditor = ({ isEditing, navigate }) => {
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
            placeholder="현재 비밀번호"
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
            placeholder="새 비밀번호"
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
            placeholder="새 비밀번호 확인"
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
          onClick={() => handlePasswordChange(navigate)}
          disabled={
            currentPassword === '' ||
            newPassword === '' ||
            confirmPassword === '' ||
            newPassword !== confirmPassword ||
            !validatePassword(newPassword)
          }
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default PasswordEditor;
