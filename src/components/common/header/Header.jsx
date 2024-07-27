import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { AlarmState, AlarmMsgState } from '../../../recoil/RecoilAlarm';
import Alarm from './Alarm';
import { signInState } from '../../../recoil/RecoilSignIn';
import { useEffect, useState } from 'react';
import { fetchReadAlarm, fetchUnreadAlarm } from '../../../api/AlarmAPI';
import { useSSE } from '../../../api/SSE';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [currentPage, setCurrentPage] = useState(0); // 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태 추가
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('new');

  // 알람 데이터 가져오기
  const fetchAlarmData = async (page, tab) => {
    const data =
      tab === 'read'
        ? await fetchReadAlarm(page, navigate)
        : await fetchUnreadAlarm(page, navigate);
    setAlarmMsg(data.content);
    setTotalPages(data.totalPages);
    if (tab === 'new') {
      setTotalUnreadCount(data.totalElements);
    }
  };

  // 엑세스토큰있으면 로그인상태로 설정하고 알림 조회
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setSignIn(true);
      fetchAlarmData(currentPage, activeTab);
    }
  }, [setSignIn, setAlarmMsg, navigate, signIn, currentPage, activeTab]);

  // SSE 연결-------------------------------------------------------------------------------------------------------

  useSSE();

  //JSX -----------------------------------------------------------------------------------------------
  return (
    <div>
      <Nav totalUnreadCount={totalUnreadCount} />
      {signIn && alarmOpen && (
        <Alarm
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          fetchAlarmData={fetchAlarmData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};
export default Header;
