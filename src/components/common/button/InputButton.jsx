export const InputButton = ({ width, onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-sm ${width}`}
      disabled={disabled}
    >
      <p className={`text-[0.8rem]`}>{children}</p>
    </button>
  );
};
export default InputButton;
