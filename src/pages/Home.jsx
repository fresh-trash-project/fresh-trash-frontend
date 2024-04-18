import Header from '../components/Home/Header';
import Hero from '../components/Home/Hero';
import Footer from '../components/Home/Footer';
import { useState } from 'react';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};
export default Home;

// import Hero from '../components/Hero';
// import greenImg from '../assets/green.jpg';
// import moneyImg from '../assets/money.jpg';
// import tradeImg from '../assets/trade.jpg';
// import { FaArrowAltCircleRight } from 'react-icons/fa';
// import {
//   HeroContainer,
//   Headline,
//   BodyCopy,
//   ListSlide,
// } from '../try/styles(styled-components)/HomeCSS';
// import { Link } from 'react-router-dom';

// const images = [greenImg, moneyImg, tradeImg];

// const Home = () => {
//   return (
//     <div>
//       <HeroContainer>
//         <Hero images={images} />;
//       </HeroContainer>

//       <Headline>
//         <h1>
//           <span>애물단지</span>에서 <span>보물단지</span>로
//         </h1>
//       </Headline>

//       <BodyCopy>
//         <p>
//           Trash가 Fresh하게! Lorem ipsum dolor, sit amet consectetur adipisicing
//           elit. Consequatur ratione suscipit sunt culpa, rerum voluptas, sint
//           eveniet deserunt laboriosam laudantium, neque minima sapiente nihil at
//           facere error. Exercitationem, iste aliquid!
//         </p>
//       </BodyCopy>

//       <ListSlide>
//         <section>
//           <div className="slide-top">
//             <div className="slide-top-left">
//               <span className="buy">사고 </span>

//               <span className="sell">팔고 </span>

//               <span className="share">나누기 </span>
//             </div>

//             <div className="slide-top-right">
//               <p>View All</p>
//             </div>
//           </div>

//           <div className="slide-content">{/* //* 데이터  */}</div>
//         </section>
//         <Link to="/ProductsList">
//           <FaArrowAltCircleRight className="arrow-right" />
//         </Link>
//       </ListSlide>
//       {/* <HorizontalLine></HorizontalLine> */}

//       <ListSlide>
//         <section>
//           <div className="slide-top">
//             <div className="slide-top-left">경매 참여 하기 </div>

//             <div className="slide-top-right">
//               <p>View All</p>
//             </div>
//           </div>

//           <div className="slide-content">{/* //* 데이터  */}</div>
//         </section>

//         <Link to="/AuctionList">
//           <FaArrowAltCircleRight className="arrow-right" />
//         </Link>
//       </ListSlide>

//       <ListSlide>
//         <section>
//           <div className="slide-top">
//             <div className="slide-top-left">폐기물 등록 </div>

//             <div className="slide-top-right">
//               <p>View All</p>
//             </div>
//           </div>

//           <div className="slide-content">{/* //* 데이터  */}</div>
//         </section>

//         <Link to="/ProductAdd">
//           <FaArrowAltCircleRight className="arrow-right" />
//         </Link>
//       </ListSlide>
//     </div>
//   );
// };
// export default Home;
