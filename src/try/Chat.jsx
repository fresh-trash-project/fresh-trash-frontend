import React from 'react';

const MessageContainer = ({ messageList }) => {
  return (
    <div>
      <div className="ml-4 chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            {/* <img
              alt="Tailwind CSS chat bubble component"
              src="https://placehold.jp/150x150.png"
            /> */}
          </div>
        </div>
        <div className="chat-header">
          {/* Obi-Wan Kenobi */}
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble bg-gray-700">{message.message}</div>
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
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble bg-white text-black">I hate you!</div>
        {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
      </div>
    </div>
  );
};

export default MessageContainer;
