import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { AlarmState, AlarmMsgState } from '../../../recoil/RecoilAlarm';
import Alarm from './Alarm';
import { signInState } from '../../../recoil/RecoilSignIn';
import { useEffect } from 'react';
import { fetchAlarm } from '../../../api/AlarmAPI';
import { EventSourcePolyfill } from 'event-source-polyfill';

const Header = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const accessToken = localStorage.getItem('access-token');
  const API_URL = import.meta.env.VITE_API_URL;
  //엑세스토큰있으면 로그인상태로
  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      // Token exists, so the user is signed in
      setSignIn(true);
    }
  }, []);

  // SSE -------------------------------------------------------------------------------------------------------
  useEffect(() => {
    let eventSource;
    if (signIn) {
      try {
        eventSource = new EventSourcePolyfill(
          // 'http://ec2-43-203-127-248.ap-northeast-2.compute.amazonaws.com:8080/api/v1/notis/subscribe',

          `${API_URL}/api/v1/notis/subscribe`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            heartbeatTimeout: 30 * 60 * 1000,
            // withCredentials: true,
          },
        );

        //맨 처음 연결할 때 받는 알람
        eventSource.addEventListener('connected', e => {
          console.log('receivedData:', e.data);
        });

        // 폐기물 판매 완료 후 받는 알람
        eventSource.addEventListener('waste-transaction-alarm', e => {
          console.log('receivedData:', e.data);
        });

        // eventSource.onmessage = async e => {
        //   console.log(e.data);
        // };
      } catch (error) {
        throw error;
      }
    }
  }, [signIn]);

  //알람받기 -----------------------------------------------------------------------------------------------
  useEffect(() => {
    const getAlarms = async () => {
      if (signIn) {
        try {
          const fetchedAlarms = await fetchAlarm();
          console.log(fetchedAlarms);
          setAlarmMsg(fetchedAlarms);
        } catch (error) {
          console.error('Error fetching: ', error);
        }
      }
    };
    getAlarms();
  }, []);

  return (
    <div>
      <Nav />
      {signIn && alarmOpen && <Alarm />}
    </div>
  );
};
export default Header;
