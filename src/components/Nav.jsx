import React from 'react';
import * as S from '../styles/ProductAddStyle';
import { Link } from 'react-router-dom';
const Nav = () => {
  return (
    <Link to="/">
      <div>
        <nav className="bg-blue-50 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/">
              <p className="text-black">Fresh Trash</p>
            </Link>
          </div>
        </nav>
      </div>
    </Link>
  );
};

export default Nav;
