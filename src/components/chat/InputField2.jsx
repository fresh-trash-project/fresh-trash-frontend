import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatMenu from './ChatMenu';
import { AiFillAlert } from 'react-icons/ai';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { MdOutlineNavigateNext } from 'react-icons/md';

import { FiMoreVertical } from 'react-icons/fi';
import MessageContainer from './MessageContainer';
import {
  bookingPost,
  completePost,
  contentFetch,
  reportPost,
} from '../../api/chat/api';
import { useParams } from 'react-router-dom';
// import { Stomp } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
// import { stompClientSetup } from '../../api/stompServer';
const InputField = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  //채팅 내용 api호출
  const [messageContent, setMessageContent] = useState([]);
  const { wasteId, chatId } = useParams();
  useEffect(() => {
    const fetchData = async (wasteId, chatId) => {
      try {
        const messageList = await contentFetch(wasteId, chatId);
        setMessageContent(messageList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(chatId, wasteId);
  }, [wasteId, chatId]);
  //판매완료
  const handleCompleted = async (wasteId, chatRoomId) => {
    await completePost(wasteId, chatRoomId);
  };
  //예약신청
  const handleBooking = async chatRoomId => {
    await bookingPost(chatRoomId);
  };
  //신고하기
  const handleReport = async chatRoomId => {
    await reportPost(chatRoomId);
  };
  const [currentUser, setCurrentUser] = useState(null);
  //유저 정보 가져오기
  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const getCurrentUser = () => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const userData = localStorage.getItem('access-token');

    try {
      // 데이터가 유효한 JSON 형식인지 확인하고 파싱
      const [header, payload, signature] = userData.split('.');

      // Payload를 Base64 디코딩하여 JSON 문자열을 얻습니다.
      const decodedPayload = atob(payload);

      const user = JSON.parse(decodedPayload);
      console.log(user);
      // setCurrentUser(user);
      return user;
    } catch (error) {
      // 파싱 오류가 발생한 경우 에러 처리 또는 기본값 반환
      console.error('사용자 정보를 파싱하는 도중 오류가 발생했습니다:', error);
      return null; // 또는 적절한 기본값 반환
    }
  };
  //웹소켓 연결
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const access = localStorage.getItem('access-token');
  useEffect(() => {
    const initializeChat = async chatId => {
      try {
        const stomp = new Client({
          brokerURL: 'ws://localhost:8080/chat-ws',
          connectHeaders: {
            Authorization: `Bearer ${access}`,
          },
          debug: str => {
            console.log(str);
          },
        });
        setStompClient(stomp);

        stomp.activate();

        stomp.onConnect = () => {
          console.log('WebSocket 연결이 열렸습니다.');
          const subscriptionDestination = `/chat/${chatId}/message`;

          stomp.subscribe(subscriptionDestination, frame => {
            try {
              const parsedMessage = JSON.parse(frame.body);

              console.log(parsedMessage);
              setMessages(prevMessages => [...prevMessages, parsedMessage]);
            } catch (error) {
              console.error('오류가 발생했습니다:', error);
            }
          });
        };
      } catch (error) {
        console.error('웹소켓 연결을 실패했습니다.', error);
      }
    };

    // 채팅 초기설정
    initializeChat();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [chatId]);

  //채팅 메세지 전송
  const sendMessage = (chatId, memberId, e) => {
    e.preventDefault();
    const destination = `/app/${chatId}/message/${memberId}`;

    stompClient.publish({
      destination,
      body: JSON.stringify({
        content: inputMessage,
        sender: currentUser,
      }),
    });

    setInputMessage('');
  };

  return (
    <div className="flex justify-center relative">
      <ChatMenu
        isOpen={isSidebarOpen}
        key={messageContent.id}
        messageList={messageContent}
      />
      {isSidebarOpen && <ChatList isOpen={isSidebarOpen} />}
      <div className=" z-50 h-screen flex flex-col w-7/12  ">
        <div className="bg-[var(--yellow-naples)] p-2  text-white flex justify-between  items-center ">
          <button
            className={`btn  text-black font-bold py-2 px-4    ${isSidebarOpen ? '' : ''}`}
            onClick={toggleSidebar}
          >
            {!isSidebarOpen ? (
              <MdOutlineNavigateBefore size={22} />
            ) : (
              <MdOutlineNavigateNext size={22} />
            )}
          </button>
          <p className="text-xl">
            '{messageContent.chatRoom && messageContent.chatRoom.wasteTitle}'
            애물단지 채팅방
          </p>
          <div className="flex mr-2 dropdown dropdown-end text-black">
            <button
              className="btn m-1"
              onClick={() =>
                handleReport(
                  messageContent.chatRoom && messageContent.chatRoom.id,
                )
              }
            >
              <AiFillAlert color="red" size={22} />
            </button>
            <div>
              <button className="btn m-1">
                <FiMoreVertical size={22} />
              </button>
              {messageContent.chatRoom &&
              messageContent.chatRoom.sellStatus !== 'CLOSE' ? (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {messageContent.chatRoom &&
                    messageContent.chatRoom.sellStatus !== 'CLOSE' && (
                      <li
                        onClick={() =>
                          handleCompleted(
                            messageContent.chatRoom &&
                              messageContent.chatRoom.wasteId,
                            messageContent.chatRoom &&
                              messageContent.chatRoom.id,
                          )
                        }
                      >
                        <p>판매완료</p>
                      </li>
                    )}
                  {messageContent.chatRoom &&
                  messageContent.chatRoom.sellStatus !== 'BOOKING' ? (
                    <li
                      onClick={() =>
                        handleBooking(
                          messageContent.chatRoom && messageContent.chatRoom.id,
                        )
                      }
                    >
                      <p> 예약신청</p>
                    </li>
                  ) : (
                    <li
                      onClick={() =>
                        handleBooking(
                          messageContent.chatRoom && messageContent.chatRoom.id,
                        )
                      }
                    >
                      <p> 판매중으로 변경</p>
                    </li>
                  )}
                </ul>
              ) : (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <p>판매완료된 상품입니다.</p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 h-full overflow-y: auto">
          <MessageContainer
            key={messageContent.id}
            messageList={messageContent}
            messages={messages}
          />
        </div>
        <form className=" bottom-0 left-0 w-full">
          <div className="bg-white p-4 flex items-center  ">
            <input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="채팅을 입력하세요"
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              onClick={() => sendMessage(currentUser.id)}
              className="bg-gray-300 text-white rounded-full p-2 ml-2 focus:outline-none"
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputField;
