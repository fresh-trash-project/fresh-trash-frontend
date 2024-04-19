import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { AlarmState } from '../../recoil/RecoilAlarm';
import Alarm from './Alarm';

const Header = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  console.log(alarmOpen);
  return (
    <div>
      <Nav />
      {alarmOpen ? <Alarm /> : null}
    </div>
  );
};
export default Header;
