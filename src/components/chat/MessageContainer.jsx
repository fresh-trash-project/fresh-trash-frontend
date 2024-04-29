import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { contentFetch } from '../../api/chat/api';

const MessageContainer = ({ messageList }) => {
  // const [message, setMessage] = useState([]);
  // const { wasteId, chatId } = useParams();
  // useEffect(() => {
  //   const fetchData = async (wasteId, chatId) => {
  //     try {
  //       const messageList = await contentFetch(wasteId, chatId);
  //       setMessage(messageList);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData(chatId, wasteId);
  // }, [wasteId, chatId]);
  return (
    <div>
      <div className="ml-4 chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://placehold.jp/150x150.png"
            />
          </div>
        </div>
        <div className="chat-header m-4">
          {messageList.chatRoom && messageList.chatRoom.buyerNickname}
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble bg-gray-700">
          {messageList.messages &&
            messageList.messages.map((message, index) => (
              <div key={index}>{message.message}</div>
            ))}
        </div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
      <div className="mr-4 chat chat-end ">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://placehold.jp/150x150.png"
            />
          </div>
        </div>
        <div className="chat-header mb-4">
          {messageList.chatRoom && messageList.chatRoom.sellerNickname}
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble bg-white text-black">I hate you!</div>
        {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
      </div>
    </div>
  );
};

export default MessageContainer;
