import React from 'react';

const MessageContainer = ({ messages, messageContent, user }) => {
  // const isArray = Array.isArray(messageContent);
  return (
    <div>
      {Array.isArray(messageContent && messageContent.messages) &&
        messageContent.messages.length > 0 && (
          <div>
            {messageContent.messages.map((message, index) => (
              <div key={index}>
                {message && message.sentMemberId === user.id ? (
                  <div className=" mr-4 chat chat-end mb-4 ">
                    <div className="chat-image avatar">
                      {/* <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://placehold.jp/150x150.png"
                        />
                      </div> */}
                    </div>
                    <div className="chat-header mb-1">
                      {message.sentMemberNickname}
                      <time className="text-xs opacity-50"></time>
                    </div>
                    <div className="chat-bubble bg-white text-black">
                      <div>{message.message}</div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-4 chat chat-start">
                    <div className="chat-image avatar">
                      {/* <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://placehold.jp/150x150.png"
                        />
                      </div> */}
                    </div>
                    <div className="chat-header m-4">
                      {message.sentMemberNickname}
                      <time className="text-xs opacity-50"></time>
                    </div>

                    <div className="chat-bubble bg-gray-700 text-white">
                      {message.message}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      {messages &&
        messages.map((message, index) => (
          <div key={index}>
            {message && message.sentMemberId === user.id ? (
              <div className="mr-4 chat chat-end mb-4 ">
                <div className="chat-header mb-4">
                  {message.sentMemberNickname}

                  <time className="text-xs opacity-50"></time>
                  {/* <p>{messageContent.chatRoom.sellerNickname}</p> */}
                </div>
                <div className="chat-bubble bg-white text-black">
                  <div>{message.message}</div>
                </div>
              </div>
            ) : (
              <div className="ml-4 chat chat-start">
                <div className="chat-header">
                  {message.sentMemberNickname}

                  <time className="text-xs opacity-50"></time>
                </div>
                <div className="chat-bubble bg-gray-700">{message.message}</div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default MessageContainer;
