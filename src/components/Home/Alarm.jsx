import { Link } from 'react-router-dom';

const Alarm = () => {
  return (
    <div className="h-full">
      <ul className="menu bg-[var(--yellow-saffron)] w-80 rounded-box z-10 text-[0.6rem]">
        <li className="menu-title">알람</li>
        <li className="border-b-[1px] border-white">
          <Link to="/Chat">
            <p>채팅이 왔습니다. </p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white">
          <Link to="/:id">
            <p>거래가 완료되었습니다.</p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
        <li className="border-b-[1px] border-white">
          <Link>
            <p>낙찰되었습니다. 축하합니다.</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Alarm;
