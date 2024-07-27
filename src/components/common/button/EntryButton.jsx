export const EntryButton = ({ type = 'button', disabled, children }) => {
  return (
    <button type={type} className={`btn w-[23rem] mt-14`} disabled={disabled}>
      <p>{children}</p>
    </button>
  );
};
export default EntryButton;
