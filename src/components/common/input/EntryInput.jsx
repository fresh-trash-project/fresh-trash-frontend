import Icon from '../service/Icon';

const Input = ({
  iconPaths = [], // iconPaths는 객체배열[d, fillRule, clipRule]. path가 2개이상이거나 fillRule clipRule가진 아이콘있어서.
  type,
  placeholder,
  value,
  onChange,
  extraButton = null,
}) => (
  <label
    className={`input input-bordered flex items-center gap-2 mt-2 mb-2 w-[23rem] ${placeholder === '인증 코드' ? 'w-[20rem]' : 'w-[23rem]'}`}
  >
    {iconPaths.length > 0 && <Icon iconPaths={iconPaths} />}
    <input
      type={type}
      className="grow border-0 focus:ring-0"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {extraButton}
  </label>
);

export default Input;
