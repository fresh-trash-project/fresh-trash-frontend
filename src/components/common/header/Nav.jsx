import { Link } from 'react-router-dom';
import { signInState, signInPanelState } from '../../../recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { AlarmMsgState, AlarmState } from '../../../recoil/RecoilAlarm';

const Nav = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log(localStorage);
    setSignIn(false);
  };

  return (
    <div className="navbar bg-[var(--green-brunswick)] text-white pr-7 ">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            className="menu menu-sm top-[63px] dropdown-content z-[1] p-2 bg-[var(--green-brunswick)] rounded-box w-60 h-60 text-white"
          >
            <li className="font-bold h-10 py-2">
              <Link to="/" className="lg:text-[1rem]">
                HOME
              </Link>
            </li>
            <li className="font-bold h-10 py-2">
              <Link to="/ProductAdd" className="lg:text-[1rem]">
                애물단지 등록
              </Link>
            </li>

            <li className="font-bold h-10 py-2">
              <a
                href="/ProductsList"
                onClick={() => {
                  window.location.href = '/ProductsList';
                }}
                className="lg:text-[1rem]"
              >
                애물단지 거래
              </a>
            </li>
            <li className="font-bold h-10 py-2">
              <Link to="/AuctionList" className="lg:text-[1rem]">
                애물단지 경매
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl md:text-3xl lg:text-4xl">
          FRESH TRASH
        </Link>
      </div>
      <div className="navbar-end ">
        {/* //! 나중에 !signIn으로 바꿀것 */}
        {!signIn ? (
          <div className="flex">
            {/* 로그인 버튼  */}
            <Link to="/SignUpSignIn" className="outline-none">
              <button
                onClick={() => setSignInPanel(true)}
                className="btn btn-ghost btn-circle flex items-end w-11 md:w-[3.5rem] lg:w-[5rem] outline-none"
              >
                <div className="indicator">
                  <div className="badge badge-neutral border-white bg-[var(--green-brunswick)] ">
                    <p className=" text-[0.4rem] md:text-[0.7rem] lg:text-[1rem]">
                      {' '}
                      로그인
                    </p>
                  </div>
                </div>
              </button>
            </Link>
            {/* 회원가입 버튼  */}
            <Link to="/SignUpSignIn" className="outline-none">
              <button
                onClick={() => setSignInPanel(false)}
                className="btn btn-ghost btn-circle flex items-end w-13 md:w-[4.5rem] lg:w-[5.5rem] outline-none"
              >
                <div className="indicator">
                  <div className="badge badge-neutral border-white bg-[var(--green-brunswick)]">
                    <p className="text-[0.4rem] md:text-[0.7rem] lg:text-[1rem]">
                      {' '}
                      회원가입
                    </p>
                  </div>
                </div>
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex ">
            {/* 마이페이지 버튼  */}
            <Link to="/MyPage" className="outline-none">
              <button
                onClick={() => setSignInPanel(true)}
                className="btn btn-ghost btn-circle flex items-end  w-14 md:w-20 lg:w-[6.5rem] outline-none"
              >
                <div className="indicator">
                  <div className="badge badge-neutral border-white bg-[var(--green-brunswick)]">
                    <p className=" text-[0.4rem] md:text-[0.7rem] lg:text-[1rem]">
                      {' '}
                      마이페이지
                    </p>
                  </div>
                </div>
              </button>
            </Link>
            {/* 로그아웃 버튼  */}
            <Link to="/" className="outline-none">
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-circle flex items-end w-14 md:w-[4.5rem] lg:w-[6rem] outline-none"
              >
                <div className="indicator">
                  <div className="badge badge-neutral border-white bg-[var(--green-brunswick)]">
                    <p className="text-[0.4rem] md:text-[0.7rem] lg:text-[1rem]">
                      {' '}
                      로그아웃
                    </p>
                  </div>
                </div>
              </button>
            </Link>
            {/* 알람버튼 */}
            <button
              className="btn btn-ghost btn-circle flex items-end w-auto h-auto outline-none"
              onClick={() => {
                setAlarmOpen(true);
              }}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
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
                <span className="badge badge-xs badge-primary indicator-item bg-[var(--yellow-naples)] border-[var(--yellow-naples)] py-2 text-black">
                  {alarmMsg?.length || 0}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Nav;
