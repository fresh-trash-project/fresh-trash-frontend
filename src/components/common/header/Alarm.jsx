import { Link, useNavigate } from 'react-router-dom';
import { AlarmState, AlarmMsgState } from '../../../recoil/RecoilAlarm';
import { useRecoilState } from 'recoil';
import { IoMdClose } from 'react-icons/io';
import { signInState } from '../../../recoil/RecoilSignIn';
import { fetchAlarm, readAlarm } from '../../../api/AlarmAPI';

const Alarm = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const navigate = useNavigate();

  //알람타입에 따라 알람메시지 클릭했을때 링크 이동
  const getLinkByAlarmType = item => {
    switch (item.alarmType) {
      case 'CHAT':
        return `/Chat/${item.alarmArgs.targetId}`;
      case 'TRANSACTION':
        return `/ProductDetail/${item.alarmArgs.targetId}`;
      case 'BIDDING':
        return `/Pay/${item.alarmArgs.targetId}`;
      default:
        return '/';
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

  //알람메시지 읽음처리 -> 메시지 개수 바뀌면 다시 로드되게
  const readAlarmMessage = async item => {
    await readAlarm(item.id, navigate);

    const fetchedAlarms = await fetchAlarm(navigate);
    setAlarmMsg(fetchedAlarms);
  };

  return (
    <div
      className={`menu absolute top-[70px] ${
        alarmOpen ? 'right-0' : '-right-full'
      } bg-green-brunswick h-96 rounded-box z-50 text-[0.6rem] mr-2 md:w-96 md:mr-5 transition-all duration-300`}
    >
      <div className="menu-title flex items-center justify-between bg-yellow-naples rounded-box mb-2 px-4 py-2">
        <p>새 알람 ({alarmMsg.length})</p>
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
        {alarmMsg.map(
          item =>
            item && (
              <li
                key={item.id}
                onClick={() => readAlarmMessage(item)}
                className="flex-nowrap border-b border-white border-opacity-30 flex flex-row items-center justify-between cursor-pointer"
              >
                <div className="w-72 truncate hover:whitespace-pre-wrap">
                  <Link to={getLinkByAlarmType(item)}>{item.message}</Link>
                </div>
                <div>
                  <IoMdClose
                    className="text-white text-xl hover:text-red-cinnabar"
                    onClick={e => removeAlarmMessage(item.id)}
                  />
                </div>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Alarm;
