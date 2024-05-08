import React, { useEffect, useState } from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { ListFetch } from '../api/chat/api';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/header/Header';
import { FaArrowRight } from 'react-icons/fa';
const ChatList = () => {
  //채팅 목록 불러오기
  const [visibleUsers, setVisibleUsers] = useState(10); // 처음에 보여지는 사용자 수
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const list = await ListFetch();
      setUserList(list);
    };
    fetchData();
  }, []);
  //사용자 클릭시 해당 채팅으로 이동
  const handleGoChatRoom = async (wasteId, chatId) => {
    navigate(`/Chat/${chatId}/${wasteId}`);
  };
  const handleLoadMore = () => {
    setVisibleUsers(prev => prev + 10); // 10명씩 추가로 보이도록 업데이트
  };
  return (
    <div>
      <Header />
      <div
        className={
          'container bg-gray-100 text-black h-screen overflow-y-auto  w-7/12 '
        }
      >
        <ul className=" ">
          <li className="px-6 py-3 bg-[var(--yellow-naples)] text-white text-2xl flex justify-center ">
            채팅목록
          </li>
          {userList.slice(0, visibleUsers).map((userList, index) => (
            <li
              key={index}
              onClick={() => handleGoChatRoom(userList.wasteId, userList.id)}
              className="px-6 py-4 text-xl hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              <div className="flex justify-between">
                <div>{userList.wasteTitle}</div>
                <div>
                  <FaArrowRight />
                </div>
              </div>
              <p></p>
            </li>
          ))}
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
    </div>
  );
};

export default ChatList;
