export const EntryButton = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={`btn w-[23rem] mt-14`}
      disabled={disabled}
    >
      <p>{children}</p>
    </button>
  );
};
export default EntryButton;
