import { Link, useNavigate } from 'react-router-dom';
import { signInState, signInPanelState } from '../../../recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';
import { AlarmMsgState, AlarmState } from '../../../recoil/RecoilAlarm';
import NavEndButton from '../button/NavEndButton';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../button/LanguageSwitcher';
import { FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Nav = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const menuItems = [
    { path: '/', label: t('HOME') },
    { path: '/ProductAdd', label: t('ADD_PRODUCT') },
    { path: '/ProductsList', label: t('PRODUCT_LIST') },
    { path: '/AuctionList', label: t('AUCTION_LIST') },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    // js-cookie를 사용하여 쿠키에서 accessToken 삭제
    Cookies.remove('accessToken', { path: '/', domain: 'localhost' });
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
            className="menu menu-sm top-[70px] md:top-[76px] lg:top-[83px] dropdown-content z-[1] p-2 bg-green-brunswick rounded-box w-60 h-60 text-white"
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
      <div className="navbar-end flex flex-col items-end -space-y-7 md:-space-y-4 lg:-space-y-1  ">
        <LanguageSwitcher />

        {!signIn ? (
          <div className="flex space-x-1">
            {/* 로그인 버튼  */}
            <NavEndButton
              to="/SignUpSignIn"
              onClick={() => setSignInPanel(true)}
              text={t('LOGIN')}
              icon={<FaSignInAlt />}
            />

            {/* 회원가입 버튼  */}
            <NavEndButton
              to="/SignUpSignIn"
              onClick={() => setSignInPanel(false)}
              text={t('SIGN_UP')}
              icon={<FaUserPlus />}
            />
          </div>
        ) : (
          <div className="flex space-x-1">
            {/* 마이페이지 버튼  */}
            <NavEndButton
              to="/MyPage"
              onClick={() => setSignInPanel(true)}
              text={t('MY_PAGE')}
              icon={<FaUser />}
            />

            {/* 로그아웃 버튼  */}
            <NavEndButton
              to="/"
              onClick={handleLogout}
              text={t('LOGOUT')}
              icon={<FaSignOutAlt />}
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
                    {alarmMsg?.filter(item => item.readAt === null).length || 0}
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
