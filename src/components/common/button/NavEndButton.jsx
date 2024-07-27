import { Link } from 'react-router-dom';

const NavEndButton = ({ to, onClick, text, icon }) => (
  <Link to={to} className="focus:outline-none">
    <button onClick={onClick} className={`btn-circle flex items-end w-full `}>
      <div className="badge badge-neutral border-white border-2 bg-green-brunswick md:py-3 lg:py-4 ">
        <p className="hidden md:block md:text-[0.7rem] lg:text-[1rem] font-bold">
          {text}
        </p>
        <span className="md:hidden">{icon}</span>
      </div>
    </button>
  </Link>
);

export default NavEndButton;
