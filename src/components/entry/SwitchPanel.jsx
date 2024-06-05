import SwitchButton from '../common/button/SwitchButton';

const SwitchPanel = ({
  signInPanel,
  translation,
  title,
  phrase,
  buttonText,
  onClick,
}) => {
  return (
    <div signInPanel={signInPanel} className={`absolute ${translation}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-5 mb-14">{phrase}</p>
      <div className="switch flex">
        <p className="mr-2 text-sm">{buttonText}</p>
        <SwitchButton onClick={onClick}>
          {signInPanel === false ? 'Sign In' : 'Sign Up'}
        </SwitchButton>
      </div>
    </div>
  );
};

export default SwitchPanel;
