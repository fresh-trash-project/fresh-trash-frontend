import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';

import greenImg from '../../assets/green.jpg';
import moneyImg from '../../assets/money.jpg';
import tradeImg from '../../assets/trade.jpg';

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [greenImg, moneyImg, tradeImg];

  // <, > 버튼 로직 -----------------------------------------------------------------------------
  const prevImage = () => {
    const prevIndex = imageIndex - 1;
    setImageIndex(prevIndex >= 0 ? prevIndex : images.length - 1);
  };

  const nextImage = () => {
    const nextIndex = imageIndex + 1;
    setImageIndex(nextIndex < images.length ? nextIndex : 0);
  };

  // JSX-------------------------------------------------------------------------
  return (
    <div className="carousel h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[40rem] w-full relative ">
      <div className="carousel-item w-full h-full">
        <img src={images[imageIndex]} className="w-full h-full object-cover" />
      </div>
      {/* Hero 좌우 화살표 버튼 --- 디자인적으로 없는게 나을거 같아서 일단 주석처리 */}
      {/* <div className="absolute flex justify-between left-10 right-10 top-1/2 transform -translate-y-1/2">
        <div onClick={prevImage} className="btn-circle-control">
          ❮
        </div>
        <div onClick={nextImage} className="btn-circle-control">
          ❯
        </div>
      </div> */}
      <div className="dot-container cursor-pointer flex absolute left-1/2 transform -translate-x-1/2 bottom-2 space-x-1.5">
        {/* 50%만큼 움직이고 div길이 반만큼 다시 돌아와야 센터 : -translate-x-1/2 */}
        {images.map((_, idx) => (
          <GoDotFill
            key={idx}
            className={`dot fill-white text-[1.5rem] hover:opacity-100 ${imageIndex === idx ? 'opacity-100' : 'opacity-50'} `}
            onClick={() => setImageIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};
export default Hero;
