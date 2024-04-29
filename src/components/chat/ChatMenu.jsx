import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteChat } from '../../api/chat/api';

const ChatMenu = ({ messageList }) => {
  const navigate = useNavigate();
  const handleDelete = async (wasteId, chatId) => {
    try {
      await deleteChat(wasteId, chatId);
      // setPosts(
      //   messageList.filter(messageList => messageList.chatRoom.id !== chatId),
      // );
      navigate('/');
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다:', error);
    }
  };
  return (
    <div className="w-16  space-y-10 py-1 border border-spacing-2  -translate-x-0 ">
      <ul>
        <li className="p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-[var(--green-brunswick)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </li>
        {/* onClick={() => handleGoChatRoom(userList.wasteId, userList.id)} */}
        <li
          className="p-5"
          onClick={() =>
            handleDelete(
              messageList.chatRoom && messageList.chatRoom.wasteId,
              messageList.chatRoom && messageList.chatRoom.id,
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-[var(--green-brunswick)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default ChatMenu;
