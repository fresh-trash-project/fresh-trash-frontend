import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo3-1.png';
import { IoFootsteps } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import {
  userNameState,
  duplicationState,
  duplicationMessageState,
} from '../recoil/RecoilUserName';

const MyPage = () => {
  const [avatarSrc, setAvatarSrc] = useState(logoImg);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [address, setAddress] = useState({
    address: '',
    zipcode: '',
    state: '',
    city: '',
    district: '',
    detail: '',
  });
  const [image, setImage] = useState(null);
  const [isDuplicate, setIsDuplicate] = useRecoilState(duplicationState);
  const [duplicationMessage, setDuplicationMessage] = useRecoilState(
    duplicationMessageState,
  );
  const [ratings, setRatings] = useState([]);
  const [newRatings, setNewRatings] = useState([]);

  //새로고침 시 이미지 기억 ------------------------------------------
  useEffect(() => {
    // Load the image from local storage when the component mounts
    const storedImage = localStorage.getItem('avatarImage');
    if (storedImage) {
      setAvatarSrc(storedImage);
      setImage(storedImage);
    }
  }, []);

  //평점 평균 --------------------------------------------------------
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ratings');
        const ratingsArray = response.data;
        setRatings(ratingsArray);
      } catch (error) {
        console.error('Error fetching ratings: ', error);
      }
    };
    fetchRatings();
  }, []);

  const averageRating = () => {
    if (ratings.length > 0) {
      const totalRating = ratings.reduce((sum, rating) => sum + rating.rate, 0);
      const average = (totalRating / ratings.length).toFixed(1);
      return average;
    } else {
      return 'N/A'; //받은 평점이 하나도 없을때
    }
  };

  //함수들-----------------------------------------------------------
  const handleEditProfile = () => {
    setIsEditing(!isEditing);

    if (isEditing && !isDuplicate) {
      handleSubmit(userName);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setAvatarSrc(imageData);
        setImage(imageData);
        // Store the image data in local storage
        localStorage.setItem('avatarImage', imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setAvatarSrc(null);
    localStorage.removeItem('avatarImage');
  };

  const handleUserNameChange = e => {
    setUserName(e.target.value);
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

  const handleSubmit = async userName => {
    try {
      const response = await axios.post('http://localhost:3000/usernames', {
        nickname: userName,
      });
    } catch (error) {
      console.error('Error submitting username: ', error);
    }
  };

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: handleAddressChange,
    }).open();
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

  //발자국-------------------------------------------------------------
  // const footstep = averageRating() * 5;
  const footstep = 30;
  // const footstep = 25;

  console.log(footstep);

  // className={`rotate-90 text-5xl text-white-ivory translate-x-[${footstep}rem]`}

  //JSX-------------------------------------------------------------
  return (
    <div className="container flex flex-col items-center mt-10">
      <style jsx>
        {`
          @media screen and (max-width: 1024px) {
            html {
              font-size: 14px;
            }
          }
          @media screen and (max-width: 768px) {
            html {
              font-size: 12px;
            }
          }
        `}
      </style>

      <div className="user-info flex relative ">
        {/* 프로필 이미지------------------------------------------------------------------------- */}

        <div className="avatar flex flex-col  ">
          <div className="w-72 rounded-full  ">
            <img
              src={avatarSrc}
              alt=""
              className={
                avatarSrc === logoImg
                  ? 'w-full h-full object-contain'
                  : 'w-full h-full object-cover'
              }
            />
          </div>
          {isEditing && (
            <div className="h-0 flex justify-center">
              {!image ? (
                <label
                  htmlFor="avatarInput"
                  className="btn btn-wide absolute top-80 left-5" //버전2에서 left-5대신 버튼끼리 모아서 flex justify-center로 개선가능할듯.
                >
                  <p>이미지 업로드</p>
                  <input
                    type="file"
                    id="avatarInput"
                    className="file-input file-input-bordered w-full max-w-xs absolute top-80"
                    accept=".jpg, .png, .jpeg"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <button
                  onClick={handleDeleteImage}
                  className="btn btn-wide absolute top-80 left-5"
                >
                  이미지 삭제
                </button>
              )}
            </div>
          )}
        </div>

        {/* 사용자 정보, 프로필 수정------------------------------------------------------------------------- */}
        <div className="user-input w-full ml-20 mt-10 flex flex-col">
          <div className="flex max-w-80">
            <input
              type="text"
              placeholder="닉네임"
              className={`input input-bordered ${isEditing ? 'mb-2' : 'mb-5'} `}
              value={userName}
              onChange={handleUserNameChange}
              disabled={!isEditing}
            />
            {isEditing && (
              <button
                onClick={() => handleDuplication(userName)}
                className="btn btn-sm ml-2"
              >
                중복확인
              </button>
            )}
          </div>
          {isEditing && (
            <div
              className={`mb-5 ${duplicationMessage === '중복된 닉네임입니다.' ? 'text-red-500' : 'text-blue-500'}`}
            >
              {duplicationMessage}
            </div>
          )}

          <div className="addr flex flex-col max-w-md">
            <div className="addr1 flex mb-5">
              <input
                type="text"
                placeholder="주소검색"
                className="input input-bordered w-80"
                value={` ${address.address}`}
                onChange={handleAddressChange}
                disabled={!isEditing}
                readOnly
              />
              {isEditing && (
                <button
                  onClick={handleSearchAddress}
                  className="btn btn-sm ml-2"
                >
                  주소검색
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="상세주소"
              className="input input-bordered w-80 max-w-md"
              disabled={!isEditing}
            />
          </div>

          <button
            className="btn btn-wide absolute top-80"
            onClick={handleEditProfile}
            disabled={isEditing && isDuplicate}
          >
            {isEditing ? '완료' : '프로필 수정'}
          </button>
        </div>
      </div>

      {/* 평점----------------------------------------------------------------------------------------- */}

      <div className="rating mt-44 flex flex-col">
        <div className="flex justify-between mb-2">
          <div className="my-rating rounded-lg p-2 bg-green-paleaqua ">
            {userName}의 평점
          </div>
          <div className="rating-value rounded-lg p-2 bg-green-paleaqua ">
            {averageRating()} / 5
          </div>
        </div>
        <div>
          <div className="ratingBar rounded-lg w-[50rem] h-14 bg-gradient-to-br from-green-200 via-green-700 to-green-950 ">
            {/* <IoFootsteps
              // className={`rotate-90 text-5xl text-white-ivory`}
              className={`rotate-90 text-5xl text-white-ivory translate-x-[${footstep}rem]`}
            /> */}
          </div>
        </div>
      </div>

      {/* 나의 목록들----------------------------------------------------------------------------------------- */}

      <div className="user-lists flex flex-col">
        <div className="card lg:card-side bg-base-100 shadow-xl mt-40 max-w-5xl ">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="나의 거래 내역"
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{userName}의 거래 내역</h2>
            <p>{userName}'s Trade Lists</p>
            <Link to="/MyTradeList" className="card-actions justify-end">
              <button className="btn btn-primary">View Now</button>
            </Link>
          </div>
        </div>

        <div className="card lg:card-side bg-base-100 shadow-xl mt-40 max-w-5xl ">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="나의 경매 내역"
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{userName}의 경매 내역</h2>
            <p>{userName}'s Auction Lists</p>
            <Link to="/MyAuctionList" className="card-actions justify-end">
              <button className="btn btn-primary">View Now</button>
            </Link>
          </div>
        </div>

        <div className="card lg:card-side bg-base-100 shadow-xl mt-40 max-w-5xl mb-10">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="나의 관심 목록"
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{userName}의 관심 목록</h2>
            <p>{userName}'s Likes</p>
            <Link to="/MyLikes" className="card-actions justify-end">
              <button className="btn btn-primary">View Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
