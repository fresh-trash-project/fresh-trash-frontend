import React, { useEffect, useState } from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { ListFetch } from '../../api/ChattingAPI';
import { Link, useNavigate, useParams } from 'react-router-dom';
const ChatList = ({ isOpen }) => {
  //채팅 목록 불러오기
  const [visibleUsers, setVisibleUsers] = useState(10); // 처음에 보여지는 사용자 수
  const [userList, setUserList] = useState([]);
  const { chatId, wasteId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (wasteId, chatId) => {
      const list = await ListFetch(wasteId, chatId);
      setUserList(list);
    };
    fetchData();
  }, [wasteId, chatId]);
  //사용자 클릭시 해당 채팅으로 이동
  const handleGoChatRoom = async (wasteId, chatId) => {
    navigate(`/Chat/${wasteId}/${chatId}`);
  };
  const handleLoadMore = () => {
    setVisibleUsers(prev => prev + 10); // 10명씩 추가로 보이도록 업데이트
  };
  return (
    <div
      className={`bg-gray-100 text-black w-40 h-screen top-0 left-0 transition-transform duration-300 ease-in-out transform overflow-y-auto ${isOpen ? '-translate-x-0' : 'translate-x-28'}`}
    >
      <ul className=" pt-4">
        {userList.slice(0, visibleUsers).map((userList, index) => (
          <li
            key={index}
            // onClick={handleGoChatRoom}
            onClick={() => handleGoChatRoom(userList.id, userList.wasteId)}
            className="px-6 py-3 hover:bg-gray-700 hover:text-white cursor-pointer"
          >
            {userList.wasteTitle} : {userList.buyerNickname}
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
  );
};

export default ChatList;
