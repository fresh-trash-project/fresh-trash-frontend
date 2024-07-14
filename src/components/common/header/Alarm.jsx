import { Link, useNavigate } from 'react-router-dom';
import { AlarmState, AlarmMsgState } from '../../../recoil/RecoilAlarm';
import { useRecoilState } from 'recoil';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { readAlarm } from '../../../api/AlarmAPI';
import { useState } from 'react';
import RatingModal from '../modal/RatingModal';
import { useTranslation } from 'react-i18next';

const Alarm = ({ currentPage, totalPages, setCurrentPage, fetchAlarmData }) => {
  const [alarmOpen, setAlarmOpen] = useRecoilState(AlarmState);
  const [alarmMsg, setAlarmMsg] = useRecoilState(AlarmMsgState);
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'read'
  const [showRatingModal, setShowRatingModal] = useState(false); // 평점 모달 상태 추가
  const [currentItem, setCurrentItem] = useState(null); // 현재 클릭된 알람 메시지 저장
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTabClick = tab => {
    setActiveTab(tab);
    setCurrentPage(0); // 탭 변경 시 페이지 초기화
    fetchAlarmData(0, tab);
  };

  const displayedMessages =
    alarmMsg && alarmMsg.length > 0
      ? activeTab === 'new'
        ? alarmMsg.filter(msg => !msg.readAt)
        : alarmMsg.filter(msg => msg.readAt)
      : [];

  //알람타입에 따라 알람메시지 클릭했을때 링크 이동
  const getLinkByAlarmType = item => {
    switch (item.alarmType) {
      case 'REQUEST_BOOKING':
        return `/ProductDetail/${item.alarmArgs.targetId}`;
      case 'CANCEL_BOOKING':
        return `/ProductDetail/${item.alarmArgs.targetId}`;
      case 'BIDDING':
        return `/Pay/${item.alarmArgs.targetId}`;
      default:
        return '/';
    }
  };

  //알람메시지 읽음처리
  const readAlarmMessage = async item => {
    if (!item.readAt) {
      await readAlarm(item.id, navigate);
      fetchAlarmData(currentPage);
    }
  };

  const handleAlarmClick = async item => {
    await readAlarmMessage(item);
    if (item.alarmType === 'REQUEST_REVIEW') {
      setCurrentItem(item);
      setShowRatingModal(true);
    } else {
      const link = getLinkByAlarmType(item);
      if (link) {
        navigate(link);
      }
    }
  };

  const handleClickPage = pageNumber => {
    setCurrentPage(pageNumber);
    fetchAlarmData(pageNumber);
  };

  return (
    <div
      className={`menu absolute top-[74px] md:top-[78px] lg:top-[98px] ${alarmOpen ? 'right-0' : '-right-full'} bg-green-brunswick h-96 rounded-box z-50 text-[0.6rem] mr-2 md:w-96 transition-all duration-300`}
    >
      <div className="menu-title flex items-center justify-between bg-yellow-naples rounded-box mb-2 px-4 py-2">
        <div className="flex space-x-1">
          <button
            onClick={() => handleTabClick('new')}
            className={`px-4 py-2 rounded ${activeTab === 'new' ? 'bg-green-current text-white' : 'bg-gray-200'} hover:bg-green-current hover:text-white`}
          >
            {t('NEW_NOTIFICATION')}
          </button>
          <button
            onClick={() => handleTabClick('read')}
            className={`px-4 py-2 rounded ${activeTab === 'read' ? 'bg-green-current text-white' : 'bg-gray-200'} hover:bg-green-current hover:text-white`}
          >
            {t('READ_NOTIFICATION')}
          </button>
        </div>
        <div
          onClick={() => setAlarmOpen(false)}
          className="cursor-pointer hover:text-green-current"
        >
          {t('CLOSE_UPPER_ENG')}
          {/* <IoMdClose className="text-xl" /> */}
        </div>
      </div>

      <ul className="h-60 overflow-y-scroll scrollbar scrollbar-thumb-yellow-naples scrollbar-track-white-ivory text-white md:text-sm">
        {displayedMessages.map(item => (
          <li
            key={item.id}
            onClick={() => handleAlarmClick(item)}
            className={`flex-nowrap border-b border-white border-opacity-30 flex flex-row items-center justify-between cursor-pointer ${item.readAt ? 'text-gray-500' : ''}`}
          >
            <div className="w-80 truncate hover:whitespace-pre-wrap">
              <Link to={getLinkByAlarmType(item)}>{item.message}</Link>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지  */}
      <div className="flex justify-between px-4 py-2 mt-5 bg-yellow-naples rounded-box">
        <button
          onClick={() => handleClickPage(currentPage - 1)}
          className={`px-4 py-2 rounded cursor-pointer ${currentPage === 0 ? 'bg-gray-300' : 'bg-gray-200 hover:bg-green-current hover:text-white'}`}
          disabled={currentPage === 0}
        >
          <IoIosArrowBack />
          {/* {t('PREV')} */}
        </button>
        <button
          onClick={() => handleClickPage(currentPage + 1)}
          className={`px-4 py-2 rounded cursor-pointer ${currentPage === totalPages - 1 ? 'bg-gray-300' : 'bg-gray-200 hover:bg-green-current hover:text-white'}`}
          disabled={currentPage === totalPages - 1}
        >
          <IoIosArrowForward />
          {/* {t('NEXT')} */}
        </button>
      </div>

      {/* 모달 */}
      {showRatingModal && currentItem && (
        <RatingModal
          type="product"
          id={currentItem.alarmArgs.targetId}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </div>
  );
};

export default Alarm;
