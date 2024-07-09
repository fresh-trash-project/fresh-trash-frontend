import { Link } from 'react-router-dom';

const NavEndButton = ({ to, onClick, text }) => (
  <Link to={to}>
    <button
      onClick={onClick}
      className={`btn btn-ghost btn-circle flex items-end w-full`}
    >
      <div className="badge badge-neutral border-white bg-green-brunswick md:py-3 lg:py-4">
        <p className="text-[0.4rem] md:text-[0.7rem] lg:text-[1rem]">{text}</p>
      </div>
    </button>
  </Link>
);

export default NavEndButton;
