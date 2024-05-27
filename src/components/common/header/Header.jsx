import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { AlarmState, AlarmMsgState } from '../../../recoil/RecoilAlarm';
import Alarm from './Alarm';
import { signInState } from '../../../recoil/RecoilSignIn';
import { useEffect } from 'react';
import { fetchAlarm } from '../../../api/AlarmAPI';
import { SSE } from '../../../api/SSE';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const navigate = useNavigate();

  // 엑세스토큰있으면 로그인상태로 설정하고 알림 조회
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setSignIn(true);
      const getAlarms = async () => {
        try {
          const fetchedAlarms = await fetchAlarm(navigate);
          setAlarmMsg(fetchedAlarms);
        } catch (error) {
          console.log(error.message);
        }
      };
      getAlarms();
    }
  }, [setSignIn, setAlarmMsg, navigate, signIn]);

  // SSE -------------------------------------------------------------------------------------------------------
  useEffect(() => {
    let eventSource;

    async function setupEventSource() {
      if (signIn) {
        if (eventSource) eventSource.close(); // Ensure previous instance is closed
        eventSource = await SSE();
      }
    }
    setupEventSource();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [signIn]);

  //JSX -----------------------------------------------------------------------------------------------
  return (
    <div>
      <Nav />
      {signIn && alarmOpen && <Alarm />}
    </div>
  );
};
export default Header;
