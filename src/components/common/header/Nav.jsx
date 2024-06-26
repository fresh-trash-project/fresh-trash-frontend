import { Link } from 'react-router-dom';
import { signInState, signInPanelState } from '../../../recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';
import { AlarmMsgState, AlarmState } from '../../../recoil/RecoilAlarm';
import NavEndButton from '../button/NavEndButton';

const Nav = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);

  const menuItems = [
    { path: '/', label: 'HOME' },
    { path: '/ProductAdd', label: '애물단지 등록' },
    { path: '/ProductsList', label: '애물단지 거래' },
    { path: '/AuctionList', label: '애물단지 경매' },
  ];
  // console.log(localStorage);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log(localStorage);
    setSignIn(false);
    setAlarmMsg([]); // Clear alarms on logout
    setAlarmOpen(false);
  };

  return (
    <div className="navbar bg-green-brunswick text-white px-2 lg:pr-7 ">
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
            className="menu menu-sm top-[63px] dropdown-content z-[1] p-2 bg-green-brunswick rounded-box w-60 h-60 text-white"
          >
            {menuItems.map(item => (
              <li key={item.path} className="font-bold h-10 py-2">
                <Link to={item.path} className="lg:text-[1rem]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl md:text-3xl lg:text-4xl">
          FRESH TRASH
        </Link>
      </div>

      {/*Nav바 오른쪽 구성 ------------------------------------------------------------------------------------------------- */}
      <div className="navbar-end ">
        {!signIn ? (
          <div className="flex ">
            {/* 로그인 버튼  */}
            <NavEndButton
              to="/SignUpSignIn"
              onClick={() => setSignInPanel(true)}
              text="로그인"
              width="w-12 md:w-[3.5rem] lg:w-[4.5rem]"
            />

            {/* 회원가입 버튼  */}
            <NavEndButton
              to="/SignUpSignIn"
              onClick={() => setSignInPanel(false)}
              text="회원가입"
              width="w-13 md:w-[4.5rem] lg:w-[6rem]"
            />
          </div>
        ) : (
          <div className="flex space-x-[0.5px]">
            {/* 마이페이지 버튼  */}
            <NavEndButton
              to="/MyPage"
              onClick={() => setSignInPanel(true)}
              text="마이페이지"
              width="w-14 md:w-20 lg:w-[6.5rem]"
            />

            {/* 로그아웃 버튼  */}
            <NavEndButton
              to="/"
              onClick={handleLogout}
              text="로그아웃"
              width="w-13 md:w-[4.5rem] lg:w-[6rem]"
            />
            {/* 알람버튼 */}
            <button
              className="btn btn-ghost btn-circle flex items-end outline-none w-auto "
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
                <span className="badge badge-xs badge-primary indicator-item bg-yellow-naples border-yellow-naples text-black rounded-full w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
                  <p className="sm:text-xs md:text-sm lg:text-md">
                    {alarmMsg?.length || 0}
                  </p>
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
