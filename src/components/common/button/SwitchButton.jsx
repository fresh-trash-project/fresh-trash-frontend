export const SwitchButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={`btn btn-xs bg-transparent`}>
      <p className="text-white">{children}</p>
    </button>
  );
};
export default SwitchButton;
