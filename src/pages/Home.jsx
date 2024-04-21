import Header from '../components/Home/Header';
import Hero from '../components/Home/Hero';
import HeroVer2 from '../components/Home/HeroVer2';
import Footer from '../components/Home/Footer';
import Card1 from '../components/common/card/Card1';
import add from '../assets/add2.jpg';
import auction from '../assets/auction2.jpg';
import sell from '../assets/sell1.jpg';

const Home = () => {
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
