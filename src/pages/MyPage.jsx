import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { duplicationState, userNameState } from '../recoil/RecoilUserName';
import logoImg from '../assets/logo.png';
import add from '../assets/add1.jpg';
import auction from '../assets/auction2.jpg';
import heart from '../assets/heart1.jpg';
import chat from '../assets/chat1.jpg';
import ProfileImageEditor from '../components/userInfo/ProfileImageEditor';
import UserNameEditor from '../components/userInfo/UserNameEditor';
import AddressEditor from '../components/userInfo/AddressEditor';
import PasswordEditor from '../components/userInfo/PasswordEditor';
import Rating from '../components/userInfo/Rating';
import NavigationCard from '../components/common/card/NavigationCard';
import { changeUserInfo, fetchUserInfo } from '../api/UserInfoAPI';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState('');
  const [image, setImage] = useState(logoImg);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [isDuplicate, setIsDuplicate] = useRecoilState(duplicationState);
  const [address, setAddress] = useState({
    zipcode: '',
    state: '',
    city: '',
    district: '',
    detail: '',
  });

  const [averageRating, setAverageRating] = useState(0);
  const [activeTab, setActiveTab] = useState('nickname');
  const tabs = [
    { name: 'nickname', label: t('NICKNAME') },
    { name: 'address', label: t('ADDRESS') },
    { name: 'password', label: t('PASSWORD') },
  ];
  const navigationItems = [
    {
      image: add,
      title: t('MY_TRADE_HISTORY'),
      phrase: t('MY_TRADE_HISTORY_PHRASE'),
      link: 'MyTradeList',
    },
    {
      image: auction,
      title: t('MY_AUCTION_HISTORY'),
      phrase: t('MY_AUCTION_HISTORY_PHRASE'),
      link: 'MyAuctionList',
    },
    {
      image: heart,
      title: t('MY_LIKES'),
      phrase: t('MY_LIKES_PHRASE'),
      link: 'MyLikes',
    },
    {
      image: chat,
      title: t('MY_CHAT_LIST'),
      phrase: t('MY_CHAT_LIST_PHRASE'),
      link: 'ChatList',
    },
  ];

  //마이페이지 들어왔을때 유저정보 불러오기-------------------------------------------------------
  useEffect(() => {
    const getUserInfo = async () => {
      const myInfo = await fetchUserInfo(navigate);
      setUserName(myInfo.nickname);
      setAddress(myInfo.address);
      setAverageRating(myInfo.rating);
      setImage(myInfo.fileName || logoImg);
      // 처음 들어갔을때는 주소가 없으니까 불러오지 못하기 때문에 아래와 같이 null일때는 빈값보이도록 처리.
      if (myInfo.address === null) {
        setAddress({
          zipcode: '',
          state: '',
          city: '',
          district: '',
          detail: '',
        });
      }
      setIsDuplicate(false);
    };
    getUserInfo();
  }, []);

  // 프로필 수정 --------------------------------------------------------------
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // 유저정보 변경---------------------------------------------------------
  const handleChangeUserInfo = async e => {
    e.preventDefault();
    setIsEditing(false);
    const changeMyInfo = await changeUserInfo(
      userName,
      address,
      imgFile,
      navigate,
    );
    setUserName(changeMyInfo.nickname);
    setAddress(changeMyInfo.address);

    // 이미지 상태 업데이트
    if (changeMyInfo && changeMyInfo.fileName) {
      setImage(changeMyInfo.fileName);
    } else {
      setImage(logoImg);
    }
  };

  // 주소 검색 ---------------------------------------------------------------------------
  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        const newAddress = {
          zipcode: data.zonecode,
          state: data.sido,
          city: data.sigungu,
          district: data.bname,
          detail: data.buildingName,
        };

        setAddress(newAddress);
      },
    }).open();
  };

  //JSX----------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="px-5">
        <div className="md:flex">
          {/* 프로필 이미지 수정---------------------------------------------------------------------- */}
          <div className="avatar flex flex-col pt-5 ">
            <ProfileImageEditor
              image={image}
              setImage={setImage}
              imgFile={imgFile}
              setImgFile={setImgFile}
              userName={userName}
              address={address}
              isEditing={isEditing}
            />

            <button
              className="btn btn-wide mx-auto mt-2 md:mx-14"
              onClick={isEditing ? handleChangeUserInfo : handleEditProfile}
              disabled={isEditing && (userName.length === 0 || isDuplicate)}
            >
              {isEditing ? t('COMPLETE_PROFILE') : t('EDIT_PROFILE')}
            </button>
          </div>

          {/* 탭별 프로필 수정-------------------------------------------------------------------- */}
          <div className="w-full flex flex-col">
            <div className="mx-auto mt-8 md:mx-14">
              {/* 탭----------------------------------------------------------------------------------------- */}
              <div className="tabs tabs-boxed mb-16 py-2">
                {tabs.map(tab => (
                  <button
                    key={tab.name}
                    className={`tab font-bold ${activeTab === tab.name ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* 닉네임변경----------------------------------------------------------------------------------------- */}
              {activeTab === 'nickname' && (
                <UserNameEditor isEditing={isEditing} />
              )}
              {/* 주소변경----------------------------------------------------------------------------------------- */}
              {activeTab === 'address' && (
                <AddressEditor
                  address={address}
                  setAddress={setAddress}
                  isEditing={isEditing}
                  handleSearchAddress={handleSearchAddress}
                />
              )}
              {/* 비번변경----------------------------------------------------------------------------------------- */}
              {activeTab === 'password' && (
                <PasswordEditor isEditing={isEditing} />
              )}
            </div>
          </div>
        </div>

        {/* 평점----------------------------------------------------------------------------------------- */}
        <Rating averageRating={averageRating} />

        {/* 나의 목록들----------------------------------------------------------------------------------------- */}
        <div className="cards bg-white py-10 mt-5">
          {navigationItems.map(item => (
            <NavigationCard
              key={item.link}
              image={item.image}
              title={item.title}
              phrase={item.phrase}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
