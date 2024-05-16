import { globalNotisAPI } from '../../variable';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const SSE = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
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

  eventSource.onerror = error => {
    console.error('EventSource failed: ', error);
    eventSource.close();
  };
  return {
    close: () => {
      if (eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
      }
    },
  };
};
