import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { AlarmState, AlarmMsgState } from '../../../recoil/RecoilAlarm';
import Alarm from './Alarm';
import { signInState } from '../../../recoil/RecoilSignIn';
import { useEffect, useState } from 'react';
import { fetchAlarm, fetchAllAlarms } from '../../../api/AlarmAPI';
import { useSSE } from '../../../api/SSE';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [currentPage, setCurrentPage] = useState(0); // 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태 추가

  // 모든 알람 데이터 가져오기
  const fetchAllAlarmData = async () => {
    const allAlarms = await fetchAllAlarms(navigate);
    setAlarmMsg(allAlarms);
  };
  // 알람 데이터 가져오기
  // const fetchAlarmData = async page => {
  //   const data = await fetchAlarm(page, navigate);
  //   setAlarmMsg(data.content);
  //   setTotalPages(data.totalPages);
  // };

  // 엑세스토큰있으면 로그인상태로 설정하고 알림 조회
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setSignIn(true);
      fetchAllAlarmData();
      // fetchAllAlarmData(currentPage);
    }
  }, [setSignIn, setAlarmMsg, navigate, signIn]);
  // }, [setSignIn, setAlarmMsg, navigate, signIn, currentPage]);

  // SSE 연결-------------------------------------------------------------------------------------------------------
  useSSE();

  //JSX -----------------------------------------------------------------------------------------------
  return (
    <div>
      <Nav />
      {signIn && alarmOpen && (
        <Alarm
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          fetchAlarmData={fetchAllAlarmData}
          // fetchAlarmData={fetchAlarmData}
        />
      )}
    </div>
  );
};
export default Header;
