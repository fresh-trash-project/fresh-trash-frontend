export const VerificationButton = ({ style, pStyle, onClick, children }) => {
  return (
    <button onClick={onClick} className={`${style}`}>
      <p className={`${pStyle}`}>{children}</p>
    </button>
  );
};
export default VerificationButton;
