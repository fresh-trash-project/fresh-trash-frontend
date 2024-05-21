import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListFetch } from '../../api/ChattingAPI';
const ChatList = ({ isOpen, currentUser }) => {
  //채팅 목록 불러오기
  const [visibleUsers, setVisibleUsers] = useState(10); // 처음에 보여지는 사용자 수
  const [currentPage, setCurrentPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await ListFetch(currentPage);
        setUserList(prevList => [...prevList, ...list.content]);
        setPage(list.totalElements);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);
  const handleGoChatRoom = async (wasteId, chatId) => {
    navigate(`/Chat/${wasteId}/${chatId}`);
  };
  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1); // 10명씩 추가로 보이도록 업데이트
  };
  return (
    <div>
      <div>
        {userList.map(userList => (
          <ul key={userList.id} className=" pt-4">
            <li
              onClick={() => handleGoChatRoom(userList.id, userList.wasteId)}
              className="px-6 py-3 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              {currentUser && currentUser.id === userList.buyerId ? (
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
        ))}
      </div>
      {userList.length < page && (
        <button
          className=" block w-full p-2 text-center  "
          onClick={handleLoadMore}
        >
          . . . 더 보기
        </button>
      )}
    </div>
  );
};

export default ChatList;
