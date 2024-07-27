import { useEffect, useRef, useState } from 'react';
import { GoDotFill } from 'react-icons/go';

import greenImg from '../../assets/green.jpg';
import moneyImg from '../../assets/money.jpg';
import tradeImg from '../../assets/trade.jpg';

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [greenImg, moneyImg, tradeImg];
  const [isHovered, setIsHovered] = useState(false); // 이미지에 hover됐을때는 자동 슬라이드를 멈춘다.

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  // JSX-------------------------------------------------------------------------
  return (
    <div
      className="carousel h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[40rem] w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((image, idx) => (
        <div
          key={idx}
          className={`carousel-item w-full h-full absolute transition-opacity duration-500 ease-in-out ${
            imageIndex === idx ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="dot-container cursor-pointer flex absolute left-1/2 transform -translate-x-1/2 bottom-2 space-x-1.5">
        {images.map((_, idx) => (
          <GoDotFill
            key={idx}
            className={`dot fill-white text-[1.5rem] hover:opacity-100 ${imageIndex === idx ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setImageIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};
export default Hero;
