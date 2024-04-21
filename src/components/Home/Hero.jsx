import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';

import greenImg from '../../assets/green.jpg';
import moneyImg from '../../assets/money.jpg';
import tradeImg from '../../assets/trade.jpg';

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [greenImg, moneyImg, tradeImg];
  // 함수 -----------------------------------------------------------------------------

  const prevImage = () => {
    const prevIndex = imageIndex - 1;
    setImageIndex(prevIndex);

    if (prevIndex < 0) return setImageIndex(images.length - 1);
  };

  const nextImage = () => {
    const nextIndex = imageIndex + 1;
    setImageIndex(nextIndex);

    if (nextIndex > images.length - 1) return setImageIndex(0);
  };

  // JSX-------------------------------------------------------------------------

  return (
    <div className="carousel h-[30rem] w-full relative pb-10">
      <div className="carousel-item w-full">
        <img
          src={images[imageIndex]}
          className="w-full h-[30rem] object-cover"
        />
      </div>

      <div className="absolute flex justify-between left-10 right-10 top-1/2">
        <div
          onClick={prevImage}
          className="btn btn-circle  text-white bg-[var(--green-brunswick)] border-[var(--green-brunswick)] hover:bg-[var(--green-brunswick)]  hover:opacity-80"
        >
          ❮
        </div>
        <div
          onClick={nextImage}
          className="btn btn-circle text-white bg-[var(--green-brunswick)] border-[var(--green-brunswick)] hover:bg-[var(--green-brunswick)]  hover:opacity-80"
        >
          ❯
        </div>
      </div>
      <div className="dot-container cursor-pointer flex absolute left-[50%] -ml-[24px] bottom-2">
        {/* 50%만큼 움직이고 div길이 반만큼 다시 돌아와야 센터 : ml-[24px] */}
        <GoDotFill
          className="dot fill-white text-[1.5rem]  hover:opacity-80  "
          onClick={() => setImageIndex(0)}
        />
        <GoDotFill
          className="dot  fill-white text-[1.5rem] hover:opacity-80 "
          onClick={() => setImageIndex(1)}
        />
        <GoDotFill
          className="dot  fill-white text-[1.5rem] hover:opacity-80 "
          onClick={() => setImageIndex(2)}
        />
      </div>
    </div>
  );
};
export default Hero;
