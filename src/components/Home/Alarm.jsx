import { Link } from 'react-router-dom';
import { AlarmState } from '../../recoil/RecoilAlarm';
import { useRecoilState } from 'recoil';
import { IoMdArrowForward, IoMdClose } from 'react-icons/io';
import { DiVisualstudio } from 'react-icons/di';

const Alarm = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);

  return (
    <div
      className={`menu absolute ${
        alarmOpen ? 'right-0' : '-right-full'
      } bg-[var(--green-brunswick)] w-96 h-96 rounded-box z-20 text-[0.6rem] `}
    >
      <div className="menu-title flex items-center justify-between bg-[var(--yellow-naples)] rounded-box mb-2">
        <p>알람 (13)</p>

        <IoMdArrowForward
          onClick={() => {
            setAlarmOpen(false);
          }}
          className="text-2xl cursor-pointer"
        />
      </div>

      {/*//! li는 나중에 알람을 받아서 map으로 처리  */}
      <ul className="h-60 overflow-y-scroll scrollbar scrollbar-thumb-yellow-naples scrollbar-track-white-ivory text-white">
        <li className="border-b border-white border-opacity-30 flex flex-row items-center justify-between">
          <div>
            <Link to="/Chat">채팅이 왔습니다. </Link>
          </div>

          <div>
            <IoMdClose className="text-white transition text-xl hover:text-[var(--red-cinnabar)]" />
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
