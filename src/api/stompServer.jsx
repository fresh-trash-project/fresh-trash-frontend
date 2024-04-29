import { Stomp } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';

const access = localStorage.getItem('access-token');
export function stompClientSetup() {
  const stomp = new Client({
    brokerURL: 'ws://localhost:8080',
    connectHeaders: {
      Authorization: `Bearer ${access}`,
    },
    debug: str => {
      console.log(str);
    },
    // reconnectDelay: 5000, // 자동 재연결
    // heartbeatIncoming: 4000,
    // heartbeatOutgoing: 4000,
  });

  stomp.activate(); //클라이언트 활성화

  return stomp;
}
