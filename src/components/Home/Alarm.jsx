import { Link } from 'react-router-dom';
import { AlarmState, AlarmMsgState } from '../../recoil/RecoilAlarm';
import { useRecoilState } from 'recoil';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { signInState } from '../../recoil/RecoilSignIn';
import { fetchAlarm, readAlarm } from '../../api/AlarmAPI';

const Alarm = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const [read, setRead] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const accessToken = localStorage.getItem('access-token');

  // const originalText =
  // '채팅이 왔습니다. 글자가 많으면 점점점 표시되고 호버하면 다 보이도록 만들고 있습니다. 이곳에 알람 메시지를 받아와야 합니다.  ';

  //알람타입에 따라 알람메시지 클릭했을때 링크 이동
  const getLinkByAlarmType = item => {
    switch (item.alarmType) {
      case 'CHAT':
        return `/Chat/${item.id}`;
      case 'TRANSACTION':
        return `/ProductDetail/${item.id}`;

      default:
        return '/MyPage';
    }
  };

  //알람메시지 삭제
  const removeAlarmMessage = id => {
    setAlarmMsg(prevMessages => {
      const updatedMessages = prevMessages.filter(msg => msg.id !== id);
      localStorage.setItem('alarmMessages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  const readAlarmMessage = async item => {
    await readAlarm(item.id);
    setRead(true);
    console.log(item.id);
  };

  // JSX -----------------------------------------------------------------------------------------------
  return (
    <div
      className={`menu absolute top-[70px] ${
        alarmOpen ? 'right-0' : '-right-full'
      } bg-[var(--green-brunswick)] h-96 rounded-box z-20 text-[0.6rem] mr-2 md:w-96 md:mr-5`}
    >
      <div className="menu-title flex items-center justify-between bg-[var(--yellow-naples)] rounded-box mb-2">
        <p>알람 ({alarmMsg.length})</p>

        <div
          onClick={() => {
            setAlarmOpen(false);
          }}
          className="cursor-pointer"
        >
          CLOSE
        </div>
      </div>

      <ul className="h-60 overflow-y-scroll scrollbar scrollbar-thumb-yellow-naples scrollbar-track-white-ivory text-white md:text-sm">
        {alarmMsg.map(item => (
          <li
            key={item.id}
            onClick={readAlarmMessage(item)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`border-b border-white border-opacity-30 flex flex-row items-center justify-between cursor-pointer  `}
          >
            <div className={`w-72`}>
              {isHovered ? (
                <Link to={getLinkByAlarmType(item)}>
                  {/*프론트에서 메시지 가져올때 {originalText} */}
                  {item.message}
                </Link>
              ) : (
                <Link to={getLinkByAlarmType(item)} className="truncate">
                  {/*프론트에서 메시지 가져올때 {originalText} */}
                  {item.message}
                </Link>
              )}
            </div>

            <div>
              <IoMdClose
                className="text-white transition text-xl hover:text-[var(--red-cinnabar)]"
                onClick={() => removeAlarmMessage(item.id)}
              />
            </div>
          </li>
        ))}

        {/* <li className="border-b border-white border-opacity-30">
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
        </li> */}
      </ul>
    </div>
  );
};
export default Alarm;
