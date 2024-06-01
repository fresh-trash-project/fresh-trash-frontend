import { useEffect, useState } from 'react';
import logoImg from '../assets/logo3-1.png';
import { IoFootsteps } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { userNameState } from '../recoil/RecoilUserName';
import Header from '../components/common/header/Header';
import NavigationCard from '../components/common/card/NavigationCard';
import add from '../assets/add1.jpg';
import auction from '../assets/auction2.jpg';
import heart from '../assets/heart1.jpg';
import chat from '../assets/chat1.jpg';
import {
  changeUserInfo,
  fetchUserInfo,
  fetchUserName,
} from '../api/UserInfoAPI';
import { signInState } from '../recoil/RecoilSignIn';
import { globalFileAPI } from '../../variable';
import urlJoin from 'url-join';
import UserNameLogic from '../components/entry/UserNameLogic';

const MyPage = () => {
  const [image, setImage] = useState(logoImg);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [address, setAddress] = useState({
    zipcode: '',
    state: '',
    city: '',
    district: '',
    detail: '',
  });
  const { isDuplicate, setIsDuplicate } = UserNameLogic();
  const [averageRating, setAverageRating] = useState(0);
  const [imgFile, setImgFile] = useState(null);
  const [signIn, setSignIn] = useRecoilState(signInState);

  //마이페이지 들어왔을때 유저정보 불러오기
  useEffect(() => {
    const getUserInfo = async () => {
      const myInfo = await fetchUserInfo();

      console.log(myInfo);
      setUserName(myInfo.nickname);
      setAddress(myInfo.address);
      setAverageRating(myInfo.rating);
      setImage(myInfo.fileName || logoImg); // Fallback to logoImg if fileName is not provided

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
    };
    getUserInfo();
  }, []);

  //함수들-----------------------------------------------------------
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  //유저정보 변경
  const handleChangeUserInfo = async e => {
    e.preventDefault();
    setIsEditing(false);
    const changeMyInfo = await changeUserInfo(userName, address, imgFile);
    setUserName(changeMyInfo.nickname);
    setAddress(changeMyInfo.address);
    setImage(changeMyInfo.fileName);
  };
  console.log('이미지.jpg:' + image);

  //이미지 변경
  const handleImageChange = async e => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl); // 미리보기용 URL을 저장
    setImgFile(file); // 실제 파일 객체를 저장
    console.log('미리보기 이미지URL:' + imageUrl);
    console.log('이미지파일 객체:' + file);
  };

  //이미지 파일 경로-----------------------------getImgUrl 함수를 통해 서버로부터 반환된 파일 이름을 URL로 변환
  const getImgUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };

  //이미지삭제
  const handleDeleteImage = async () => {
    try {
      // Call the backend API to update user information with null image
      await changeUserInfo(userName, address, null);
      setImage(logoImg);
      setImgFile(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserNameChange = e => {
    setUserName(e.target.value);
    setIsDuplicate(false);
  };

  //닉네임 중복확인
  const handleDuplication = async userName => {
    fetchUserName(setIsDuplicate, userName, setUserName, signIn, setSignIn);
  };

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: handleAddressChange,
    }).open();
  };

  const handleAddressChange = data => {
    const newAddress = {
      zipcode: data.zonecode,
      state: data.sido,
      city: data.sigungu,
      district: data.bname,
      detail: data.buildingName,
    };
    setAddress(newAddress);
    if (newAddress === null) {
      setAddress({
        zipcode: '',
        state: '',
        city: '',
        district: '',
        detail: '',
      });
    }
  };

  //초록바의 길이를 100%로 -------------------------------------------------------------
  const [greenBarWidth, setGreenBarWidth] = useState(0);

  useEffect(() => {
    // Function to update the green bar width
    const updateGreenBarWidth = () => {
      const parentElement = document.querySelector('.ratingBar').parentElement;
      if (parentElement) {
        setGreenBarWidth(parentElement.offsetWidth);
      }
    };
    // Call the function once on mount
    updateGreenBarWidth();

    // Listen for window resize to update the width dynamically
    window.addEventListener('resize', updateGreenBarWidth);

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', updateGreenBarWidth);
  }, []);

  //백에서 평점 받을 때 발자국 이동거리
  let footstep = (averageRating / 5) * 100 - (30 / greenBarWidth) * 100;
  if (averageRating === 0) {
    footstep = (averageRating / 5) * 100;
  }

  //JSX-------------------------------------------------------------
  return (
    <div>
      <Header />

      <div className="px-5">
        <div className="md:flex">
          {/* 프로필 이미지------------------------------------------------------------------------- */}
          <div className="avatar flex flex-col pt-5">
            {/* <div className="w-72 rounded-full mx-auto md:mx-10 ">
              <img
                src={getImgUrl(image)}
                alt=""
                className={'w-full h-full object-cover'}
              />
              {console.log(getImgUrl(image))}
            </div> */}
            {isEditing ? (
              <div className="w-72 rounded-full mx-auto md:mx-10 ">
                <img
                  // src={imgFile && URL.createObjectURL(imgFile)}
                  src={imgFile}
                  alt=""
                  className={'w-full h-full object-cover'}
                />
                {/* {console.log(getImgUrl(image))} */}
              </div>
            ) : (
              <div className="w-72 rounded-full mx-auto md:mx-10 ">
                <img
                  src={getImgUrl(image)}
                  alt=""
                  className={'w-full h-full object-cover'}
                />
                {console.log(getImgUrl(image))}
              </div>
            )}
            <button
              className="btn btn-wide mx-auto mt-2 md:mx-14"
              onClick={isEditing ? handleChangeUserInfo : handleEditProfile}
              disabled={isEditing && isDuplicate}
            >
              {isEditing ? '프로필 수정 완료' : '프로필 수정'}
            </button>
            {isEditing && (
              <button className="mx-auto mt-2 md:mx-14">
                {!image || image === logoImg ? (
                  <label htmlFor="avatarInput" className="btn btn-wide">
                    <p>이미지 업로드</p>
                    <input
                      type="file"
                      id="avatarInput"
                      className="file-input file-input-bordered hidden"
                      accept=".jpg, .png, .jpeg"
                      onChange={handleImageChange}
                    />
                  </label>
                ) : (
                  <button onClick={handleDeleteImage} className="btn btn-wide">
                    이미지 삭제
                  </button>
                )}
              </button>
            )}
          </div>

          <div className="w-full flex flex-col">
            <div className="mx-auto mt-8 md:mx-14">
              <div className="flex items-center">
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
                  className={`mb-5 w-fit ${isDuplicate ? 'text-red-400' : 'text-blue-400'}`}
                ></div>
              )}

              <div className="addr flex flex-col mx-auto">
                <div className="addr1 flex mb-2 items-center">
                  <input
                    type="text"
                    placeholder="주소검색"
                    className="input input-bordered w-80"
                    value={`${address.zipcode} ${address.state} ${address.city} ${address.district}`}
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
                  className="input input-bordered w-80"
                  disabled={!isEditing}
                  value={address.detail}
                  onChange={e =>
                    setAddress(prevAddress => ({
                      ...prevAddress,
                      detail: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* 평점----------------------------------------------------------------------------------------- */}
        <div className="rating flex flex-col mt-14">
          <div className="flex justify-between mb-2">
            <div className="my-rating rounded-lg p-2 bg-green-paleaqua ">
              나의 평점
            </div>
            <div className="rating-value rounded-lg p-2 bg-green-paleaqua ">
              {/*프론트에서 구할때 {averageRating()} / 5 */}
              {averageRating + ' / 5'}
            </div>
          </div>

          <div>
            <div className="ratingBar relative h-8 rounded-lg bg-gradient-to-br from-green-200 via-green-700 to-green-950 ">
              <IoFootsteps
                className={`absolute text-3xl rotate-90 text-white-ivory`}
                style={{ left: `${footstep}%` }}
              />
            </div>
          </div>
        </div>

        {/* 나의 목록들----------------------------------------------------------------------------------------- */}
        <div className="cards bg-white py-10 mt-5">
          <NavigationCard
            image={add}
            title="나의 거래 내역"
            phrase="My Trade List"
            link="MyTradeList"
          />
          <NavigationCard
            image={auction}
            title="나의 경매 내역"
            phrase="My Auction List"
            link="MyAuctionList"
          />
          <NavigationCard
            image={heart}
            title="나의 관심 목록"
            phrase="MY Likes"
            link="MyLikes"
          />
          <NavigationCard
            image={chat}
            title="나의 채팅 목록"
            phrase="My Chat List"
            link="ChatList"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
