import React, { useState } from 'react';

const ChatList = ({ isOpen }) => {
  const [visibleUsers, setVisibleUsers] = useState(10); // 처음에 보여지는 사용자 수

  const users = [
    '사용자 1',
    '사용자 2',
    '사용자 3',
    '사용자 4',
    '사용자 5',
    '사용자 6',
    '사용자 7',
    '사용자 8',
    '사용자 9',
    '사용자 10',
    '사용자 11',
    '사용자 12',
    '사용자 13',
    '사용자 14',
    '사용자 15',
    '사용자 16',
    '사용자 17',
    '사용자 18',
    '사용자 19',
    '사용자 20',
    '사용자 11',
    '사용자 12',
    '사용자 13',
    '사용자 14',
    '사용자 15',
    '사용자 16',
    '사용자 17',
    '사용자 18',
    '사용자 19',
    '사용자 20',
  ];
  const handleLoadMore = () => {
    setVisibleUsers(prev => prev + 10); // 10명씩 추가로 보이도록 업데이트
  };
  return (
    <div
      className={`bg-gray-100 text-black w-40 h-screen top-0 left-0 transition-transform duration-300 ease-in-out transform overflow-y-auto ${isOpen ? '-translate-x-0' : 'translate-x-28'}`}
    >
      <ul className=" pt-4">
        {users.slice(0, visibleUsers).map((user, index) => (
          <li
            key={index}
            className="px-6 py-3 hover:bg-gray-700 hover:text-white cursor-pointer"
          >
            {user}
          </li>
        ))}
      </ul>
      {visibleUsers < users.length && (
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
