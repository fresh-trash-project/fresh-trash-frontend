import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { AlarmState, AlarmMsgState } from '../../recoil/RecoilAlarm';
import Alarm from './Alarm';
import { signInState } from '../../recoil/RecoilSignIn';
import { useEffect } from 'react';
import { fetchAlarm } from '../../api/AlarmAPI';

const Header = () => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const accessToken = localStorage.getItem('access-token');

  //엑세스토큰있으면 로그인상태로
  // App initialization
  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      // Token exists, so the user is signed in
      setSignIn(true);
    }
  }, []);

  //SSE -------------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   if (signIn) {
  //     try {
  //       const fetchSSE = async () => {
  //         const eventSource = new EventSource(
  //           'http://localhost:8080/api/v1/notis/subscribe',
  //           {
  //             headers: { Authorization: `Bearer ${accessToken}` },
  //           },
  //         );
  //         eventSource.addEventListener('alarm', event => {
  //           const eventData = JSON.parse(event.data);
  //           console.log('receivedData:', eventData);
  //         });
  //       };
  //       fetchSSE();
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  // }, [signIn]);

  //알람받기 -----------------------------------------------------------------------------------------------
  useEffect(() => {
    const getAlarms = async () => {
      try {
        const fetchedAlarms = await fetchAlarm();
        console.log(fetchedAlarms);
        setAlarmMsg(fetchedAlarms);
      } catch (error) {
        console.error('Error fetching ratings: ', error);
      }
    };

    //로컬스토리지에 저장한 알람 있으면 그거 받아오기 Retrieve stored alarm messages from local storage when the component mounts
    const storedAlarmMessages = JSON.parse(
      localStorage.getItem('alarmMessages'),
    );
    console.log(storedAlarmMessages);

    if (storedAlarmMessages === null) {
      if (signIn) getAlarms();
    } else if (storedAlarmMessages.length > 0) {
      setAlarmMsg(storedAlarmMessages);
    }
  }, []);

  return (
    <div>
      <Nav />
      {signIn && alarmOpen && <Alarm />}
    </div>
  );
};
export default Header;
