import { Link, useNavigate } from 'react-router-dom';
import { signInState, signInPanelState } from '../../../recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';
import { AlarmMsgState, AlarmState } from '../../../recoil/RecoilAlarm';
import NavEndButton from '../button/NavEndButton';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../button/LanguageSwitcher';
import { FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';

const Nav = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [signInPanel, setSignInPanel] = useRecoilState(signInPanelState);
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const menuItems = [
    { path: '/', label: t('HOME') },
    signIn && {
      path: '/MyPage',
      label: t('MY_PAGE'),
      subMenu: [
        { path: '/MyPage/MyTradeList', label: t('MY_TRADE_HISTORY') },
        { path: '/MyPage/MyAuctionList', label: t('MY_AUCTION_HISTORY') },
        { path: '/MyPage/MyLikes', label: t('MY_LIKES') },
      ],
    },
    { path: '/ProductAdd', label: t('ADD_PRODUCT') },
    { path: '/ProductsList', label: t('PRODUCT_LIST') },
    { path: '/AuctionList', label: t('AUCTION_LIST') },
  ].filter(Boolean); // filter(Boolean)을 사용하여 배열에서 false 값 제거

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    Cookies.remove('accessToken', { path: '/', domain: 'localhost' });
    setSignIn(false);
    setAlarmMsg([]);
    setAlarmOpen(false);
  };

  return (
    <div className="navbar bg-green-brunswick text-white px-2 lg:pr-7 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
            className="menu menu-sm top-[68px] md:top-[72px] lg:top-20 dropdown-content z-[1] p-2 bg-green-brunswick rounded-box w-60 h-auto text-white"
          >
            {menuItems.map(item => (
              <li key={item.path} className="font-bold h-auto py-2">
                <div
                  className="flex justify-between items-center"
                  onClick={() => item.subMenu && setShowSubMenu(!showSubMenu)}
                >
                  <Link to={item.path} className="lg:text-[1rem]">
                    {item.label}
                  </Link>
                  {item.subMenu && (
                    <button>
                      {showSubMenu ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                {item.subMenu && showSubMenu && (
                  <ul className="pl-4 border-l-2 border-white">
                    {item.subMenu.map(subItem => (
                      <li key={subItem.path} className="font-normal h-8 py-1">
                        <Link to={subItem.path} className="lg:text-[0.9rem]">
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
      <div className="navbar-end flex flex-col items-end -space-y-4 md:-space-y-2 lg:-space-y-0">
        <LanguageSwitcher padding="px-2" />
        {!signIn ? (
          <div className="flex space-x-1">
            <NavEndButton
              to="/SignUpSignIn"
              onClick={() => setSignInPanel(true)}
              text={t('LOGIN')}
              icon={<FaSignInAlt />}
            />
            <NavEndButton
              to="/SignUpSignIn"
              onClick={() => setSignInPanel(false)}
              text={t('SIGN_UP')}
              icon={<FaUserPlus />}
            />
          </div>
        ) : (
          <div className="flex space-x-1">
            <NavEndButton
              to="/MyPage"
              onClick={() => setSignInPanel(true)}
              text={t('MY_PAGE')}
              icon={<FaUser />}
            />
            <NavEndButton
              to="/"
              onClick={handleLogout}
              text={t('LOGOUT')}
              icon={<FaSignOutAlt />}
            />
            <button
              className="btn btn-ghost btn-circle flex items-end outline-none w-auto"
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
