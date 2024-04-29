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
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
const InputField = ({ message, setMessage, sendMessage }) => {
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

  //채팅 stompJS

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
          {/**판매자 구매자에 따라 보이는 메뉴 다름 */}
          <div className="flex mr-2 dropdown dropdown-end text-black">
            {/* 판매상태 booking이면 예약중으로 글자 바꾸기 */}
            {/* <button
              className="btn m-1"
              onClick={() =>
                handleBooking(
                  messageContent.chatRoom && messageContent.chatRoom.id,
                )
              }
            >
              예약신청
            </button> */}
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
              {/* onClick=
              {() =>
                handleDelete(
                  messageList.chatRoom.wasteId,
                  messageList.chatRoom.id,
                )
              } */}
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {/* {messageContent.chatRoom &&}messageContent.cha */}
                <li
                  onClick={() =>
                    handleCompleted(
                      messageContent.chatRoom &&
                        messageContent.chatRoom.wasteId,
                      messageContent.chatRoom && messageContent.chatRoom.id,
                    )
                  }
                >
                  <p>판매완료</p>
                </li>
                <li
                  onClick={() =>
                    handleBooking(
                      messageContent.chatRoom && messageContent.chatRoom.id,
                    )
                  }
                >
                  <p> 예약신청</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 h-full overflow-y: auto">
          <MessageContainer
            key={messageContent.id}
            messageList={messageContent}
          />
          {/* {[...Array(20)].map((_, index) => (
            <MessageContainer key={index} />
          ))} */}
        </div>
        <form className=" bottom-0 left-0 w-full">
          <div className="bg-white p-4 flex items-center  ">
            <input
              placeholder="채팅을 입력하세요"
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
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
