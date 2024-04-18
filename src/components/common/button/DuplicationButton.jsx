const DuplicationButton = ({ onClick, style, pStyle }) => {
  return (
    <button onClick={onClick} className={`${style}`}>
      <p className={`${pStyle}`}>중복확인</p>
    </button>
  );
};
export default DuplicationButton;
