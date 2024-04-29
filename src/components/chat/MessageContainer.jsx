import React from 'react';

const MessageContainer = ({ messages, member, partner }) => {
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
          {partner.chatRoom && partner.chatRoom.sellerNickname}
          <time className="text-xs opacity-50"></time>
        </div>
        {messages.map((message, index) => (
          <div className="chat-bubble bg-gray-700">
            <div>{message.message}</div>
          </div>
        ))}

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
          {member.chatRoom && member.chatRoom.buyerNickname}
          <time className="text-xs opacity-50"></time>
        </div>
        {/* <div className="chat-bubble bg-white text-black">I hate you!</div> */}
        {messages.map((message, index) => (
          <div className="chat-bubble bg-white text-black">
            <div>{message.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageContainer;
