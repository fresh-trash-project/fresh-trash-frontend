import { useEffect, useState } from 'react';
import logoImg from '../assets/logo.png';
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
  const [imgFile, setImgFile] = useState('');
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
  const [signIn, setSignIn] = useRecoilState(signInState);
  // imgFile은 로컬에서 미리보기를 위한 파일 객체를 저장하고,
  // image는 서버로부터 받은 파일 이름(fileName) 또는 URL을 저장

  //마이페이지 들어왔을때 유저정보 불러오기
  useEffect(() => {
    const getUserInfo = async () => {
      const myInfo = await fetchUserInfo();

      console.log(myInfo);
      setUserName(myInfo.nickname);
      setAddress(myInfo.address);
      setAverageRating(myInfo.rating);
      setImage(myInfo.fileName || logoImg); // Fallback to logoImg if fileName is not provided
      console.log('마이인포파일네임', myInfo.fileName);

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
    console.log('API response:', changeMyInfo); // API 응답 로그 출력

    setUserName(changeMyInfo.nickname);
    setAddress(changeMyInfo.address);
    // 이미지 상태 업데이트
    if (changeMyInfo && changeMyInfo.fileName) {
      setImage(changeMyInfo.fileName);
    } else {
      setImage(logoImg); // 실패 시 로고 이미지로 재설정
    }
    console.log('Updated image:', changeMyInfo.fileName); // 업데이트된 이미지 파일명 로그 출력
  };
  console.log('imgFile:' + imgFile);
  console.log('image:' + image);

  //이미지 변경
  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // 미리보기용 URL을 저장 - imgFile에(file에) createObjectUrl적용한것.
      setImgFile(file); // 실제 파일 객체를 저장
      console.log('미리보기용 이미지URL:' + imageUrl);
      console.log('imgFile:' + file);
    } else {
      setImage(logoImg);
    }
  };

  //이미지 파일 경로-----------------------------getImgUrl 함수를 통해 서버로부터 반환된 파일 이름을 URL로 변환
  const getImgUrl = image => {
    // 로컬 리소스인 경우 바로 경로를 반환
    if (!image || image === logoImg) {
      return logoImg;
    }
    // Blob URL인 경우 원본 URL을 그대로 반환. blob URL은 로컬 파일의 미리보기를 위한 URL로 서버URL로 변환하면 안됨.
    if (image.startsWith('blob:')) {
      return image;
    }
    // 서버의 이미지 경로 처리
    const fullPath = urlJoin(globalFileAPI, `${image}`);
    console.log('파일 이미지 경로: ', fullPath);
    return fullPath;
  };

  //이미지삭제
  const handleDeleteImage = async () => {
    try {
      const response = await changeUserInfo(userName, address, null);
      console.log(response);
      if (response) {
        setImage(logoImg); // 로고 이미지로 재설정
        setImgFile(null); // 파일 객체 제거
      } else {
        console.error('Failed to delete image:', response);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
    // setImage(logoImg); // 로고 이미지로 재설정
    // setImgFile(null); // 파일 객체 제거
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
            <div className="w-72 rounded-full mx-auto md:mx-10 ">
              {/* 편집 모드에서 로컬 이미지 파일이 있으면 그것을 사용, 없으면 서버 이미지 사용 */}
              <img
                src={imgFile ? URL.createObjectURL(imgFile) : getImgUrl(image)}
                alt="프로필 이미지"
                className={'w-full h-full object-cover'}
                onError={e => {
                  e.target.src = logoImg;
                }} // 로드 실패 시 기본 이미지
              />
            </div>
            {console.log(imgFile)}
            {console.log(image)}
            {/* 이미지를 업로드하면 imgFile, imgFile을 서버로 넘김 
            서버는 받은 imgFile을 서버의 파일시스템이나 S3같은 클라우드 스토리지에 저장 
            이미지파일 저장 과정에서 고유한 이름 생성('02db636b-986f-4e00-952c-bd8aa7a982f0.jpg')
            저장된 이미지파일의 접근 경로(URL) 또는 파일명을 데이터베이스에 저장. 
            이 정보는 사용자의 프로필 이미지 경로로 사용되며 사용자 프로필을 조회할 떄 이 경로를 통해 이미지를 불러옴. 
            새 이미지 URL을 클라이언트에 반환. 
            클라이언트는 서버에서 보낸 URL을 image에 저장.*/}
            {console.log(getImgUrl(image))}
            {/* getImgUrl 함수는 서버로부터 받은 이미지 파일명을 웹에서 접근 가능한 URL로 변환하는 역할을 합니다.  */}
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
