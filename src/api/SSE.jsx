import { globalNotisAPI } from '../../variable';
import { EventSourcePolyfill } from 'event-source-polyfill';
//EventSource API는 HTTP 요청에 헤더를 추가하는 기능을 기본적으로 지원하지 않는다.
//따라서 인증이 필요한 SSE 연결을 설정할 때는 즉, Authorization 헤더와 같은 인증 정보를 추가해야 할 경우,
// EventSourcePolyfill을 사용.

export const SSE = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  console.log('Attempting to establish SSE connection...');
  console.log('API Endpoint:', `${globalNotisAPI}/subscribe`);
  console.log('Headers:', headers);

  const eventSource = new EventSourcePolyfill(`${globalNotisAPI}/subscribe`, {
    heartbeatTimeout: 30 * 60 * 1000,
    headers,
  });

  //맨 처음 연결할 때 받는 알람
  eventSource.addEventListener('connected', e => {
    console.log('receivedData:', e.data);
  });

  // 거래상태 변경 후 받는 알람
  eventSource.addEventListener('waste-transaction-alarm', e => {
    console.log('receivedData:', e.data);
  });

  // 모든 메시지 이벤트 로깅
  eventSource.onmessage = e => {
    console.log('message event received:', e.data);
  };

  // 오류 발생 시 디버깅 정보 추가
  eventSource.onerror = error => {
    console.error('EventSource error:', error);
    console.error('EventSource readyState:', eventSource.readyState);
    if (eventSource.readyState === EventSource.CLOSED) {
      console.error('EventSource is closed.');
    } else {
      console.error('EventSource encountered an error but is not closed.');
      console.log('Current time:', new Date().toISOString());
      console.log('Retrying connection in 5 seconds...');
      setTimeout(() => {
        eventSource.close();
        SSE();
      }, 5000); // 5초 후 재연결 시도
    }
  };
  return {
    close: () => {
      if (eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
      }
    },
  };
};
