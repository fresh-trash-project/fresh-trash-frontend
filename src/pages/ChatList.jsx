import React, { useEffect, useState } from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { ListFetch } from '../api/ChattingAPI';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/header/Header';
import List from '../components/chat/ChatList';
import { FaArrowRight } from 'react-icons/fa';
const ChatList = () => {
  //채팅 목록 불러오기
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const list = await ListFetch();
      setUserList(list);
    };
    fetchData();
  }, []);
  //유저 정보 가져오기------------------------------------------------------
  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);
  // 로컬 스토리지에서 사용자 정보 가져오기-----------------------
  const getCurrentUser = () => {
    const userData = localStorage.getItem('accessToken');

    try {
      const [header, payload, signature] = userData.split('.');

      const decodedPayload = atob(payload);

      const user = JSON.parse(decodedPayload);
      console.log(user);

      return user;
    } catch (error) {
      console.error('사용자 정보를 파싱하는 도중 오류가 발생했습니다:', error);
      return null;
    }
  };
  return (
    <div>
      <Header />
      <div className="container bg-gray-100 text-black h-screen overflow-y-auto  w-7/12">
        <div className='"px-6 py-3 bg-yellow-naples text-white text-2xl flex justify-center'>
          채팅목록
        </div>
        {userList.map(userList => (
          <List
            key={userList.id}
            userList={userList}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
