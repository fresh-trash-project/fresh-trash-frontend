import { globalNotisAPI } from '../../variable';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const SSE = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  const eventSource = new EventSourcePolyfill(`${globalNotisAPI}/subscribe`, {
    heartbeatTimeout: 30 * 60 * 1000,
    headers, //인증토큰을 보냈을때 서버가 데이터를 보내준다.
  });

  //맨 처음 연결할 때 받는 알람
  eventSource.addEventListener('connected', e => {
    console.log('receivedData:', e.data);
  });

  // 거래상태 변경 후 받는 알람
  eventSource.addEventListener('waste-transaction-alarm', e => {
    console.log('receivedData:', e.data);
  });

  eventSource.onmessage = e => {
    console.log('message event received:', e.data);
  };

  // 오류 발생 시 디버깅 정보 추가
  eventSource.onerror = error => {
    console.log('EventSource error:', error);
    console.log('EventSource readyState:', eventSource.readyState);
    if (eventSource.readyState === EventSource.CLOSED) {
      console.log('EventSource is closed.');
    } else {
      console.log('EventSource encountered an error but is not closed.');
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
