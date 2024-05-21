import React from 'react';
import { Link } from 'react-router-dom';

const NavEndButton = ({ to, onClick, text, width }) => (
  <Link to={to} className="outline-none">
    <button
      onClick={onClick}
      className={`btn btn-ghost btn-circle ${width} outline-none flex items-end`}
    >
      <div className="badge badge-neutral border-white bg-green-brunswick">
        <p className="text-[0.4rem] md:text-[0.7rem] lg:text-[1rem]">{text}</p>
      </div>
    </button>
  </Link>
);

export default NavEndButton;
