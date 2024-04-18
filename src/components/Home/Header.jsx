import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { alarmState } from '../../recoil/RecoilAlarm';
import Alarm from './Alarm';

const Header = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(alarmState);
  console.log(alarmOpen);
  return (
    <div>
      <Nav />
      {alarmOpen ? <Alarm /> : null}
    </div>
  );
};
export default Header;
