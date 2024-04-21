import React, { useState } from 'react';
import ChatList from './ChatList';
import SideMenu from './SideMenu';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { MdOutlineNavigateNext } from 'react-icons/md';

import { FiMoreVertical } from 'react-icons/fi';
import MessageContainer from './MessageContainer';
const InputField = ({ message, setMessage, sendMessage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex justify-center relative">
      <SideMenu isOpen={isSidebarOpen} />
      {isSidebarOpen && <ChatList isOpen={isSidebarOpen} />}
      <div className=" z-50 h-screen flex flex-col w-7/12  ">
        <div className="bg-[var(--yellow-naples)] p-2  text-white flex justify-between  items-center ">
          <button
            className={`btn  text-black font-bold py-2 px-4    ${isSidebarOpen ? '' : ''}`}
            onClick={toggleSidebar}
          >
            {!isSidebarOpen ? (
              <MdOutlineNavigateBefore />
            ) : (
              <MdOutlineNavigateNext />
            )}
          </button>
          <p>닉네임</p>
          {/**판매자 구매자에 따라 보이는 메뉴 다름 */}
          <div className="mr-2 dropdown dropdown-end text-black">
            <div tabIndex={0} role="button" className="btn m-1">
              <FiMoreVertical />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p>판매완료</p>
              </li>
              <li>
                <p>판매취소</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-100 h-full overflow-y: auto">
          <MessageContainer />
          {/* {[...Array(20)].map((_, index) => (
            <MessageContainer key={index} />
          ))} */}
        </div>
        <form onSubmit={sendMessage} className=" bottom-0 left-0 w-full">
          <div className="bg-white p-4 flex items-center  ">
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
