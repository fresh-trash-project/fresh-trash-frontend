import {
  FaFacebook,
  FaInstagram,
  FaPhoneSquareAlt,
  FaYoutube,
} from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { SiKakaotalk } from 'react-icons/si';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';

export const Facebook = ({ style }) => {
  return <FaFacebook className={`sns-icon ${style}`} />;
};
export const Instagram = ({ style }) => {
  return <FaInstagram className={`sns-icon ${style}`} />;
};
export const XTwitter = ({ style }) => {
  return <FaSquareXTwitter className={`sns-icon ${style}`} />;
};
export const Google = ({ style }) => {
  return <AiFillGoogleCircle className={`sns-icon ${style}`} />;
};
export const Kakao = ({ style }) => {
  return <SiKakaotalk className={`sns-icon ${style}`} />;
};
export const Youtube = ({ style }) => {
  return <FaYoutube className={`sns-icon ${style}`} />;
};
export const Naver = ({ style }) => {
  return <SiNaver className={`sns-icon ${style}`} />;
};
export const Phone = ({ style }) => {
  return <FaPhoneSquareAlt className={`sns-icon ${style}`} />;
};
