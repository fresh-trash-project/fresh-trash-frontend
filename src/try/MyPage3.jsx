//CSS component로 작성했던 부분. 나중에 보기 위해 지우지 않고 남겨둠.

import { Link } from 'react-router-dom';
import {
  MyPageContainer,
  ProfileInfo,
  RatingSection,
  RatingBar,
  FootStep,
  MyList,
  Heart,
} from '../styles/MyPageCSS';
import { useState } from 'react';
import axios from 'axios';

import Notification from '../components/Notification';

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('User Name');
  const [address, setAddress] = useState({
    address: '',
    zipcode: '',
    state: '',
    city: '',
    district: '',
    detail: '',
  });
  const [image, setImage] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [duplicationMessage, setDuplicationMessage] = useState('');

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleUserNameChange = e => {
    setUserName(e.target.value);

    //Reset duplication status when the input changes
    setIsDuplicate(false);
    setDuplicationMessage('');
  };

  const handleDuplication = async userName => {
    try {
      const response = await axios.get('http://localhost:3000/usernames', {
        params: {
          nickname: userName,
        },
      });

      if (response.status === 200 && response.data.length === 0) {
        setDuplicationMessage('사용 가능한 닉네임입니다.');
        setIsDuplicate(false);
      } else {
        setDuplicationMessage('중복된 닉네임입니다.');
        setIsDuplicate(true);
      }
    } catch (error) {
      console.error('Error checking duplicate username: ', error);
    }
  };

  const handleAddressChange = data => {
    setAddress({
      address: data.address,
      zipcode: data.zonecode,
      state: data.sido,
      city: data.sigungu,
      district: data.bname,
      detail: data.buildingName,
    });
  };

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: handleAddressChange,
    }).open();
  };

  const handleImageChange = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <MyPageContainer>
      <ProfileInfo>
        <div className="profile-img-container">
          <div className="profile-img">
            {isEditing && (
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="img-input"
                onChange={handleImageChange}
              />
            )}
            {image && <img src={image} />}
          </div>
          {image && isEditing && (
            <button className="delete-button" onClick={handleDeleteImage}>
              Delete
            </button>
          )}
        </div>

        <div className="user-info">
          <input
            type="text"
            placeholder="회원가입시 닉네임"
            className="user-name-input"
            value={userName}
            onChange={handleUserNameChange}
            disabled={!isEditing}
          />
          {isEditing && (
            <button
              className="edit-button duplicate-check"
              onClick={() => handleDuplication(userName)}
            >
              중복확인
            </button>
          )}
          <br />
          {isEditing && (
            <div
              className={`duplication-message ${
                duplicationMessage === '중복된 닉네임입니다.' ? 'error' : ''
              }`}
            >
              {duplicationMessage}
            </div>
          )}

          <br />
          <input
            type="text"
            name="addr1"
            placeholder="주소 검색"
            className="address-input addr1"
            value={` ${address.zipcode} ${address.state} ${address.city} ${address.district} ${address.detail}`}
            onChange={handleAddressChange}
            disabled={!isEditing}
            readOnly
          />
          {isEditing && (
            <button
              className="edit-button search-address"
              onClick={handleSearchAddress}
            >
              검색
            </button>
          )}
          <input
            type="text"
            name="addr2"
            className="address-input addr2"
            placeholder="세부 주소"
          />
          <br />
          <button
            className="edit-profile-button"
            onClick={handleEditProfile}
            disabled={isDuplicate && isEditing}
          >
            {isEditing ? '완료' : '프로필 수정'}
          </button>
        </div>
      </ProfileInfo>

      <Notification></Notification>

      <RatingSection>
        <div>
          <div className="my-rating">나의 평점</div>
          <div className="rating-value">4.5 / 5</div>
        </div>
        <RatingBar></RatingBar>
        <FootStep></FootStep>
      </RatingSection>
      <MyList>
        <div className="lists">
          <div className="my-trade-list">
            <p>{userName}의 거래 내역</p>
            <Link to="/MyTradeList" className="click">
              <p>Click</p>
            </Link>
          </div>

          <div className="my-auction-list">
            <p>{userName}의 경매 내역</p>
            <Link to="/MyAuctionList" className="click">
              <p>Click</p>
            </Link>
          </div>
        </div>
        <div className="likes">
          <div className="my-likes">
            <p>
              {userName}의 관심 목록
              <Heart />
            </p>
            <Link to="/MyLikes" className="click">
              <p>Click</p>
            </Link>
          </div>
        </div>
      </MyList>
    </MyPageContainer>
  );
};

export default MyPage;
