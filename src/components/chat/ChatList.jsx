import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ChatList = ({ isOpen, currentUser, userList }) => {
  //채팅 목록 불러오기
  const [visibleUsers, setVisibleUsers] = useState(10); // 처음에 보여지는 사용자 수
  const navigate = useNavigate();

  const handleGoChatRoom = async (wasteId, chatId) => {
    navigate(`/Chat/${wasteId}/${chatId}`);
  };
  const handleLoadMore = () => {
    setVisibleUsers(prev => prev + 10); // 10명씩 추가로 보이도록 업데이트
  };
  return (
    <div>
      <ul className=" pt-4">
        <li
          onClick={() => handleGoChatRoom(userList.id, userList.wasteId)}
          className="px-6 py-3 hover:bg-gray-700 hover:text-white cursor-pointer"
        >
          {currentUser.id === userList.buyerId ? (
            <p>
              {userList.sellerNickname}-{userList.wasteTitle}
            </p>
          ) : (
            <p>
              {userList.buyerNickname}- {userList.wasteTitle}
            </p>
          )}
        </li>
      </ul>
      {visibleUsers < userList.length && (
        <button
          className="mt-16 block w-full p-2 text-center  "
          onClick={handleLoadMore}
        >
          . . . 더 보기
        </button>
      )}
    </div>
  );
};

export default ChatList;
