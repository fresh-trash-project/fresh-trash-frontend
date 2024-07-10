import Header from '../components/common/header/Header';
import Hero from '../components/home/Hero';
import Footer from '../components/common/footer/Footer';
import NavigationCard from '../components/common/card/NavigationCard';
import add from '../assets/add2.jpg';
import auction from '../assets/auction3.jpg';
import sell from '../assets/sell1.jpg';
import { useRecoilState } from 'recoil';
import { signInState } from '../recoil/RecoilSignIn';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const { t } = useTranslation();
  const navigationCardItems = [
    {
      image: add,
      title: t('ADD_PRODUCT_VERB'),
      phrase: t('SELL_YOUR_FRESH_TRASH_UPPER_ENG'),
      link: 'ProductAdd',
    },
    {
      image: sell,
      title: t('TRADING_PRODUCT'),
      phrase: t('GET_YOUR_FRESH_TRASH_UPPER_ENG'),
      link: 'ProductsList',
    },
    {
      image: auction,
      title: t('AUCTION_PRODUCT'),
      phrase: t('WIN_YOUR_FRESH_TRASH_UPPER_ENG'),
      link: 'AuctionList',
    },
  ];

  // 쿠키에서 access token을 가져와서 로컬스토리지에 저장
  useEffect(() => {
    const accessToken = getCookies('accessToken');
    if (accessToken) {
      setSignIn(true);
      localStorage.setItem('accessToken', accessToken);
    }
  }, []);

  function getCookies(name) {
    const cookies = document.cookie.split(';');
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
      <div className="cards bg-white py-10 px-3 ">
        {navigationCardItems.map((card, index) => (
          <NavigationCard
            key={index}
            image={card.image}
            title={card.title}
            phrase={card.phrase}
            link={card.link}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};
export default Home;
