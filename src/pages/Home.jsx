import Header from '../components/Home/Header';
import Hero from '../components/Home/Hero';
import HeroVer2 from '../components/Home/HeroVer2';
import Footer from '../components/Home/Footer';
import Card1 from '../components/common/card/Card1';
import add from '../assets/add2.jpg';
import auction from '../assets/auction3.jpg';
import sell from '../assets/sell1.jpg';
import { useRecoilState } from 'recoil';
import { signInState } from '../recoil/RecoilSignIn';
import { useEffect } from 'react';

const Home = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);

  //함수 -----------------------------------------------------------------------------------
  // 쿠키에서 access token을 가져와서 로컬스토리지에 저장
  useEffect(() => {
    const accessToken = getCookies('accessToken');
    if (accessToken) {
      setSignIn(true);
      localStorage.setItem('accessToken', accessToken);
      console.log('쿠키에 있는 엑세스토큰:' + accessToken);
      console.log('로컬스토리지에 있는 엑세스토큰:' + localStorage.accessToken);
    }
  }, []);

  function getCookies(name) {
    const cookies = document.cookie.split(';');
    console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      //쿠키랑 이름이(accessToken) 일치하면 쿠키값 반환
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  //JSX-----------------------------------------------------------------------------------
  return (
    <div>
      <Header />
      <Hero />
      {/* <HeroVer2 /> */}
      <div className="cards bg-white py-10 px-3 ">
        <Card1
          image={add}
          title="애물단지 등록하기"
          phrase="SELL YOUR FRESH TRASH"
          link="ProductAdd"
        />
        <Card1
          image={sell}
          title="애물단지 거래 중..."
          phrase="GET YOUR FRESH TRASH"
          link="ProductsList"
        />
        <Card1
          image={auction}
          title="애물단지 경매 중..."
          phrase="GET YOUR FRESH TRASH"
          link="AuctionList"
        />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
