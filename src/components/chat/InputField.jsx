import React, { useState } from 'react';
import ChatList from './ChatList';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { MdOutlineNavigateNext } from 'react-icons/md';
const InputField = ({ message, setMessage, sendMessage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="relative">
      <div className="absolute">
        <button
          className={`bg-gray-300  text-white font-bold py-2 px-4  absolute  ${isSidebarOpen ? 'translate-x-80' : ''}`}
          onClick={toggleSidebar}
        >
          {!isSidebarOpen ? (
            <MdOutlineNavigateBefore />
          ) : (
            <MdOutlineNavigateNext />
          )}
        </button>
        <ChatList isOpen={isSidebarOpen} />
      </div>

      <div className="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto relative">
        <div className="bg-[var(--yellow-naples)] p-4 text-white flex justify-between items-center">
          닉네임
        </div>
        <form
          onSubmit={sendMessage}
          className="absolute bottom-0 left-0 w-full"
        >
          <div className="bg-white p-4 flex items-center">
            <input
              placeholder="채팅을 입력하세요"
              value={message}
              onChange={event => setMessage(event.target.value)}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
              // multiline={false}
              // row={1}
            />
            <button
              disabled={message === ''}
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
