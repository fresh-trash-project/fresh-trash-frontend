import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="container">
      <div className="navbar bg-[var(--green-brunswick)] text-white">
        <div className="navbar-start">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[var(--green-brunswick)] rounded-box w-52 text-white"
            >
              <li className="font-bold">
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/ProductAdd">애물단지 등록</Link>
              </li>
              <li>
                <Link to="/ProductsList">애물단지 거래</Link>
              </li>
              <li>
                <Link to="/AuctionList">애물단지 경매</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">FRESH TRASH</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item bg-[var(--yellow-naples)] border-[var(--yellow-naples)]"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Nav;
