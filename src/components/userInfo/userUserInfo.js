import { useEffect, useState } from 'react';
import { fetchUserInfo, changeUserInfo } from '../api/UserInfoAPI';
import logoImg from '../assets/logo.png';
import urlJoin from 'url-join';
import { globalFileAPI } from '../../variable';

const useUserInfo = () => {
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState({
    zipcode: '',
    state: '',
    city: '',
    district: '',
    detail: '',
  });
  const [image, setImage] = useState(logoImg);
  const [imgFile, setImgFile] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      const myInfo = await fetchUserInfo();
      setUserName(myInfo.nickname);
      setAddress(
        myInfo.address || {
          zipcode: '',
          state: '',
          city: '',
          district: '',
          detail: '',
        },
      );
      setImage(myInfo.fileName || logoImg);
    };
    getUserInfo();
  }, []);

  const handleChangeUserInfo = async () => {
    const changeMyInfo = await changeUserInfo(userName, address, imgFile);
    setUserName(changeMyInfo.nickname);
    setAddress(changeMyInfo.address);
    setImage(changeMyInfo.fileName || logoImg);
  };

  const handleImageChange = file => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImgFile(file);
    } else {
      setImage(logoImg);
    }
  };

  const handleDeleteImage = async () => {
    const response = await changeUserInfo(userName, address, null);
    if (response) {
      setImage(logoImg);
      setImgFile(null);
    }
  };

  const getImgUrl = image => {
    if (!image || image === logoImg) return logoImg;
    if (image.startsWith('blob:')) return image;
    return urlJoin(globalFileAPI, `${image}`);
  };

  return {
    userName,
    setUserName,
    address,
    setAddress,
    image,
    imgFile,
    handleChangeUserInfo,
    handleImageChange,
    handleDeleteImage,
    getImgUrl,
  };
};

export default useUserInfo;
