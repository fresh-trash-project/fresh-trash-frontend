import EntryInput from '../common/input/EntryInput';
import InputButton from '../common/button/InputButton';

const Email = ({
  showVerificationButton = false,
  email,
  code = null,
  setCode = null,
  codeSent = null,
  confirmed = null,
  handleEmailChange,
  handleSendCode = null,
  handleVerifyCode = null,
}) => {
  const emailIconPaths = [
    {
      d: 'M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z',
    },
    {
      d: 'M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z',
    },
  ];

  return (
    <div className="flex flex-col items-end">
      <EntryInput
        iconPaths={emailIconPaths}
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        extraButton={
          showVerificationButton && (
            <InputButton
              width="w-[4rem]"
              onClick={handleSendCode}
              disabled={!email}
            >
              인증
            </InputButton>
          )
        }
      />

      {email && codeSent && confirmed === false && (
        <EntryInput
          type="text"
          placeholder="인증 코드"
          value={code}
          onChange={e => {
            e.preventDefault();
            setCode(e.target.value);
          }}
          extraButton={
            <InputButton
              width="w-[4rem]"
              onClick={handleVerifyCode}
              disabled={!code}
            >
              확인
            </InputButton>
          }
        />
      )}
    </div>
  );
};

export default Email;
