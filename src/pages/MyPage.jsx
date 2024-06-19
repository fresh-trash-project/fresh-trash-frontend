import { useEffect, useState } from 'react';
import logoImg from '../assets/logo.png';
import { IoFootsteps } from 'react-icons/io5';
import { FaCamera, FaTimes } from 'react-icons/fa';
import { VscEye } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import { userNameState } from '../recoil/RecoilUserName';
import Header from '../components/common/header/Header';
import NavigationCard from '../components/common/card/NavigationCard';
import add from '../assets/add1.jpg';
import auction from '../assets/auction2.jpg';
import heart from '../assets/heart1.jpg';
import chat from '../assets/chat1.jpg';
import {
  changePassword,
  changeUserInfo,
  fetchUserInfo,
  fetchUserName,
} from '../api/UserInfoAPI';
import { signInState } from '../recoil/RecoilSignIn';
import { globalFileAPI } from '../../variable';
import urlJoin from 'url-join';
import UserNameLogic from '../components/entry/UserNameLogic';
import EmailLogic from '../components/entry/EmailLogic';
import passwordLogic from '../components/entry/PasswordLogic';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../Constants';

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
  const [activeTab, setActiveTab] = useState('nickname');
  const navigate = useNavigate();
  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // imgFile은 로컬에서 미리보기를 위한 파일 객체를 저장하고,
  // image는 서버로부터 받은 파일 이름(fileName) 또는 URL을 저장

  // 각 비밀번호 입력 필드의 상태 관리
  const {
    password: currentPassword,
    showPassword: showCurrentPassword,
    handlePasswordChange: handleCurrentPasswordChange,
    handlePasswordVisibility: handleCurrentPasswordVisibility,
  } = passwordLogic();
  const {
    password: newPassword,
    showPassword: showNewPassword,
    handlePasswordChange: handleNewPasswordChange,
    handlePasswordVisibility: handleNewPasswordVisibility,
  } = passwordLogic();
  const {
    password: confirmPassword,
    showPassword: showConfirmPassword,
    handlePasswordChange: handleConfirmPasswordChange,
    handlePasswordVisibility: handleConfirmPasswordVisibility,
  } = passwordLogic();

  //마이페이지 들어왔을때 유저정보 불러오기
  useEffect(() => {
    const getUserInfo = async () => {
      const myInfo = await fetchUserInfo();
      console.log('마이페이지 들어왔을때 받은 데이터: ', myInfo);
      setUserName(myInfo.nickname);
      setAddress(myInfo.address);
      setAverageRating(myInfo.rating);
      setImage(myInfo.fileName || logoImg);
      console.log('서버로부터 받은 파일 이름을 image에 저장: ', image);
      console.log('이미지 객체 파일 imgFile: ', imgFile);
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

    // 이미지 상태 업데이트
    if (changeMyInfo && changeMyInfo.fileName) {
      setImage(changeMyInfo.fileName);
    } else {
      setImage(logoImg);
    }
  };

  //이미지 변경
  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl); // 미리보기용 URL을 저장 - imgFile에(file에) createObjectUrl적용한것.
      setImgFile(file); // 실제 파일 객체를 저장
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
    console.log('image를 경로 처리한 fullPath: ', fullPath);
    return fullPath;
  };

  //이미지삭제
  const handleDeleteImage = async () => {
    try {
      const response = await changeUserInfo(userName, address, null);
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

  // 비밀번호 상태 변수 및 함수
  const currentPasswordLogic = passwordLogic();
  const newPasswordLogic = passwordLogic();
  const confirmPasswordLogic = passwordLogic();

  // 비밀번호 변경
  const handlePasswordChange = async () => {
    console.log('Current Password:', currentPasswordLogic.password); // 디버그 정보
    console.log('New Password:', newPasswordLogic.password); // 디버그 정보
    console.log('Confirm Password:', confirmPasswordLogic.password); // 디버그 정보

    if (newPasswordLogic.password !== confirmPasswordLogic.password) {
      toast.error(MESSAGES.NEW_PASSWORD_NOT_MATCH);
      return;
    }

    try {
      await changePassword(
        currentPasswordLogic.password,
        newPasswordLogic.password,
        setSignIn,
        navigate,
      );
    } catch (error) {
      console.log('비밀번호 변경 오류:', error);
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
          <div className="avatar flex flex-col pt-5 relative">
            <div className="w-72 rounded-full mx-auto md:mx-10 border">
              {/* 편집 모드에서 로컬 이미지 파일이 있으면 그것을 사용, 없으면 서버 이미지 사용 */}
              <img
                src={imgFile ? URL.createObjectURL(imgFile) : getImgUrl(image)}
                alt="프로필 이미지"
                className={'w-full h-full object-cover'}
                onError={e => {
                  console.error(e.target.src);
                  e.target.src = logoImg;
                }} // 로드 실패 시 기본 이미지
              />
            </div>
            {/*console.log(imgFile)*/}
            {/*console.log(image)*/}
            {/* 이미지를 업로드하면 imgFile, imgFile을 서버로 넘김 
            서버는 받은 imgFile을 서버의 파일시스템이나 S3같은 클라우드 스토리지에 저장 
            이미지파일 저장 과정에서 고유한 이름 생성('02db636b-986f-4e00-952c-bd8aa7a982f0.jpg')
            저장된 이미지파일의 접근 경로(URL) 또는 파일명을 데이터베이스에 저장. 
            이 정보는 사용자의 프로필 이미지 경로로 사용되며 사용자 프로필을 조회할 떄 이 경로를 통해 이미지를 불러옴. 
            새 이미지 URL을 클라이언트에 반환. 
            클라이언트는 서버에서 보낸 URL을 image에 저장.*/}
            {console.log('UI src: ', getImgUrl(image))}
            {/* getImgUrl 함수는 서버로부터 받은 이미지 파일명을 웹에서 접근 가능한 URL로 변환하는 역할을 합니다.  */}
            <button
              className="btn btn-wide mx-auto mt-2 md:mx-14"
              onClick={isEditing ? handleChangeUserInfo : handleEditProfile}
              disabled={isEditing && isDuplicate}
            >
              {isEditing ? '프로필 수정 완료' : '프로필 수정'}
            </button>
            {isEditing && (
              <button>
                {!image || image === logoImg ? (
                  <label
                    htmlFor="avatarInput"
                    className="absolute top-14 right-10 cursor-pointer"
                  >
                    <FaCamera className="text-white text-3xl bg-gray-700 p-1 rounded-full" />

                    <input
                      type="file"
                      id="avatarInput"
                      className="file-input file-input-bordered hidden"
                      accept=".jpg, .png, .jpeg"
                      onChange={handleImageChange}
                    />
                  </label>
                ) : (
                  <button
                    onClick={handleDeleteImage}
                    className="absolute top-14 right-10 bg-gray-700 p-1 rounded-full"
                  >
                    <FaTimes className="text-white text-xl" />
                  </button>
                )}
              </button>
            )}
          </div>

          {/* <div className="w-full flex flex-col">
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
        </div> */}

          <div className="w-full flex flex-col">
            <div className="mx-auto mt-8 md:mx-14">
              <div className="tabs tabs-boxed mb-16">
                <button
                  className={`tab font-bold ${activeTab === 'nickname' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('nickname')}
                >
                  닉네임
                </button>
                <button
                  className={`tab font-bold ${activeTab === 'address' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('address')}
                >
                  주소
                </button>
                <button
                  className={`tab font-bold ${activeTab === 'password' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('password')}
                >
                  비밀번호
                </button>
              </div>

              {activeTab === 'nickname' && (
                <div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="닉네임"
                      className={`input input-bordered w-1/2`}
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
                </div>
              )}

              {activeTab === 'address' && (
                <div className="addr flex flex-col mx-auto">
                  <div className="addr1 flex mb-2 items-center">
                    <input
                      type="text"
                      placeholder="주소검색"
                      className="input input-bordered w-full"
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
                    className="input input-bordered w-full"
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
              )}

              {activeTab === 'password' && (
                <div>
                  <div className="flex items-center">
                    <label className="input input-bordered mb-2 w-2/3 flex">
                      <input
                        type={
                          currentPasswordLogic.showPassword
                            ? 'text'
                            : 'password'
                        }
                        placeholder="현재 비밀번호"
                        className="w-full border-none focus:ring-0"
                        disabled={!isEditing}
                        value={currentPasswordLogic.password}
                        onChange={currentPasswordLogic.handlePasswordChange}
                      />
                      <button
                        onClick={currentPasswordLogic.handlePasswordVisibility}
                      >
                        <VscEye />
                      </button>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <label className="input input-bordered mb-2 w-2/3 flex">
                      <input
                        type={
                          newPasswordLogic.showPassword ? 'text' : 'password'
                        }
                        placeholder="새 비밀번호"
                        className="w-full border-none focus:ring-0"
                        disabled={!isEditing}
                        value={newPasswordLogic.password}
                        onChange={newPasswordLogic.handlePasswordChange}
                      />
                      <button
                        onClick={newPasswordLogic.handlePasswordVisibility}
                      >
                        <VscEye />
                      </button>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <label className="input input-bordered mb-2 w-2/3 flex">
                      <input
                        type={
                          confirmPasswordLogic.showPassword
                            ? 'text'
                            : 'password'
                        }
                        placeholder="새 비밀번호 확인"
                        className="w-full border-none focus:ring-0"
                        disabled={!isEditing}
                        value={confirmPasswordLogic.password}
                        onChange={confirmPasswordLogic.handlePasswordChange}
                      />
                      <button
                        onClick={confirmPasswordLogic.handlePasswordVisibility}
                      >
                        <VscEye />
                      </button>
                    </label>

                    <button
                      onClick={handlePasswordChange}
                      className="btn btn-sm ml-2"
                    >
                      저장
                    </button>
                  </div>
                </div>
              )}
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
