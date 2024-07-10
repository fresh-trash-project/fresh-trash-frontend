import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListFetch } from '../../api/ChattingAPI';
import { useTranslation } from 'react-i18next';

const ChatList = ({ isOpen, currentUser }) => {
  //채팅 목록 불러오기
  const { t } = useTranslation();
  const [visibleUsers, setVisibleUsers] = useState(10); // 처음에 보여지는 사용자 수
  const [currentPage, setCurrentPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await ListFetch(currentPage, navigate);
        setUserList(prevList => [...prevList, ...list.content]);
        setPage(list.totalElements);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);
  const handleGoChatRoom = async (productId, chatId) => {
    navigate(`/Chat/${productId}/${chatId}`);
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
              onClick={() => handleGoChatRoom(userList.id, userList.productId)}
              className="px-6 py-3 hover:bg-gray-700 hover:text-white cursor-pointer"
            >
              {currentUser && currentUser.id === userList.buyerId ? (
                <p>
                  {userList.sellerNickname}-{userList.productTitle}
                </p>
              ) : (
                <p>
                  {userList.buyerNickname}- {userList.productTitle}
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
          . . .{t('SHOW_MORE')}
        </button>
      )}
    </div>
  );
};

export default ChatList;
