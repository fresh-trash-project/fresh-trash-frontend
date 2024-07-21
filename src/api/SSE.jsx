import { useRecoilState } from 'recoil';
import { globalNotisAPI } from '../../variable';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { signInState } from '../recoil/RecoilSignIn';
import { useEffect } from 'react';

let eventSource = null;

export const useSSE = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);

  useEffect(() => {
    const setupEventSource = () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        return;
      }

      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }

      const headers = { Authorization: `Bearer ${accessToken}` };

      eventSource = new EventSourcePolyfill(`${globalNotisAPI}/subscribe`, {
        heartbeatTimeout: 30 * 60 * 1000,
        headers, //인증토큰을 보냈을때 서버가 데이터를 보내준다.
      });

      eventSource.onopen = () => console.log('SSE Opened');

      //맨 처음 연결할 때 받는 알람
      eventSource.addEventListener('connected', e => {
        console.log('receivedData:', e.data);
      });

      eventSource.addEventListener('product_status', e => {
        console.log('receivedData:', e.data);
      });

      eventSource.addEventListener('auction_status', e => {
        console.log('receivedData:', e.data);
      });

      eventSource.addEventListener('pay_status', e => {
        console.log('receivedData:', e.data);
      });

      eventSource.addEventListener('flag', e => {
        console.log('receivedData:', e.data);
      });

      eventSource.onmessage = e => {
        console.log('message event received:', e.data);
      };

      // 오류 발생 시 디버깅 정보 추가
      eventSource.onerror = error => {
        console.log('error: ', error);

        eventSource.close();
        eventSource = null; // 중복 연결 방지
      };
    };

    if (signIn) {
      setupEventSource();
    } else if (eventSource) {
      eventSource.close();
      eventSource = null;
    }

    // Cleanup on unmount
    return () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    };
  }, [signIn]);
};
