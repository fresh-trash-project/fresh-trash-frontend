import React, { useEffect, useState } from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { ListFetch } from '../api/ChattingAPI';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/header/Header';
import List from '../components/chat/ChatList';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
const ChatList = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="container bg-gray-100 text-black h-screen overflow-y-auto  w-7/12">
        <div className='"px-6 py-3 bg-yellow-naples text-white text-2xl flex justify-center'>
          {t('CHAT_LIST')}
        </div>

        <div
          className="overflow-y-auto h-[calc(100vh-100px)]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <List />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
