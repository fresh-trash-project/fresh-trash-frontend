import React from 'react';

const ChatList = ({ isOpen }) => {
  return (
    <div
      className={` bg-gray-100 text-black w-80 h-full  top-0 left-0 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <ul className="pt-10">
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">메뉴 1</li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">메뉴 2</li>
        <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">메뉴 3</li>
      </ul>
    </div>
  );
};

export default ChatList;
