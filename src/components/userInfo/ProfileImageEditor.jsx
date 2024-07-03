import logoImg from '../../assets/logo.png';
import { FaCamera, FaTimes } from 'react-icons/fa';
import { changeUserInfo } from '../../api/UserInfoAPI';
import { globalFileAPI } from '../../../variable';
import urlJoin from 'url-join';

const ProfileImageEditor = ({
  image,
  setImage,
  imgFile,
  setImgFile,
  userName,
  address,
  isEditing,
}) => {
  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl); // 미리보기용 URL을 저장- imgFile에(file에) createObjectUrl적용한것.
      setImgFile(file);
    } else {
      setImage(logoImg);
    }
    console.log('이미지파일 객체:', imgFile);
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
    return fullPath;
  };

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
  };

  return (
    <div className="w-72 mx-auto md:mx-10 border rounded-full relative">
      <img
        src={imgFile ? URL.createObjectURL(imgFile) : getImgUrl(image)}
        alt="프로필 이미지"
        className={'w-full h-full object-cover'}
        onError={e => {
          console.error(e.target.src);
          e.target.src = logoImg;
        }}
      />

      {isEditing && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default ProfileImageEditor;

/*
-imgFile은 로컬에서 미리보기를 위한 파일 객체를 저장하고,
-image는 서버로부터 받은 파일 이름(fileName) 또는 URL을 저장 

이미지를 업로드하면 imgFile, imgFile을 서버로 넘김
서버는 받은 imgFile을 서버의 파일시스템이나 S3같은 클라우드 스토리지에 저장
이미지파일 저장 과정에서 고유한 이름 생성('02db636b-986f-4e00-952c-bd8aa7a982f0.jpg')
저장된 이미지파일의 접근 경로(URL) 또는 파일명을 데이터베이스에 저장.
이 정보는 사용자의 프로필 이미지 경로로 사용되며 사용자 프로필을 조회할 떄 이 경로를 통해 이미지를 불러옴.
새 이미지 URL을 클라이언트에 반환.
클라이언트는 서버에서 보낸 URL을 image에 저장. 
*/
