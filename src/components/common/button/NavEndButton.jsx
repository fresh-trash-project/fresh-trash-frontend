import { Link } from 'react-router-dom';

const NavEndButton = ({ to, onClick, text, icon }) => (
  <Link to={to} className="focus:outline-none">
    <button
      onClick={onClick}
      className={`btn btn-ghost btn-circle flex items-end w-full focus:outline-none`}
    >
      <div className="badge badge-neutral border-white bg-green-brunswick md:py-3 lg:py-4 focus:outline-none ">
        <p className="hidden md:block md:text-[0.7rem] lg:text-[1rem] focus:outline-none">
          {text}
        </p>
        <span className="md:hidden">{icon}</span>
      </div>
    </button>
  </Link>
);

export default NavEndButton;
