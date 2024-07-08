import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { signInState } from '../recoil/RecoilSignIn';

const OAuthCallback = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const data = await fetchAuthUserInfo(navigate, setSignIn, location);
        console.log('User data:', data); // 데이터 출력
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    handleCallback();
  }, [location, navigate, setSignIn]);

  return null;
};

export default OAuthCallback;
