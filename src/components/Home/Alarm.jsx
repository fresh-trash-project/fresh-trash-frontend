import { Link } from 'react-router-dom';
import { AlarmState } from '../../recoil/RecoilAlarm';
import { useRecoilState } from 'recoil';
import { IoMdArrowForward, IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';

const Alarm = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [isHovered, setIsHovered] = useState(false);

  const originalText =
    '채팅이 왔습니다. 글자가 많으면 점점점 표시되고 호버하면 다 보이도록 만들고 있습니다. 이곳에 알람 메시지를 받아와야 합니다.  ';

  return (
    <div
      className={`menu absolute top-[70px] ${
        alarmOpen ? 'right-0' : '-right-full'
      } bg-[var(--green-brunswick)] h-96 rounded-box z-20 text-[0.6rem] mr-2 md:w-96 md:mr-5`}
    >
      <div className="menu-title flex items-center justify-between bg-[var(--yellow-naples)] rounded-box mb-2">
        <p>알람 (13)</p>

        <div
          onClick={() => {
            setAlarmOpen(false);
          }}
          className="cursor-pointer"
        >
          CLOSE
        </div>
      </div>

      {/*//! li는 나중에 알람을 받아서 map으로 처리  */}
      <ul className="h-60 overflow-y-scroll scrollbar scrollbar-thumb-yellow-naples scrollbar-track-white-ivory text-white md:text-sm">
        <li
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`border-b border-white border-opacity-30 flex flex-row items-center justify-between cursor-pointer  `}
        >
          <div className={`w-72`}>
            {isHovered ? (
              <Link to="/Chat">{originalText}</Link>
            ) : (
              <Link to="/Chat" className="truncate">
                {originalText}
              </Link>
            )}
          </div>

          <div>
            <IoMdClose className="text-white transition text-xl hover:text-[var(--red-cinnabar)] " />
          </div>
        </li>

        {/* //! 클릭하면 알람 삭제되는거 구현  */}

        <li className="border-b border-white border-opacity-30">
          <Link to="/:id">
            <p>거래가 완료되었습니다.</p>
          </Link>
        </li>
        <li className="border-b border-white border-opacity-30">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
        <li className="border-b border-white border-opacity-30">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white border-opacity-30">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white border-opacity-30">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white border-opacity-30">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white border-opacity-30">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Alarm;
