import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import greenImg from '../../assets/green.jpg';
import moneyImg from '../../assets/money.jpg';
import tradeImg from '../../assets/trade.jpg';

const HeroVer2 = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [greenImg, moneyImg, tradeImg, greenImg, moneyImg, tradeImg];

  return (
    <div className=" m-auto flex w-3/4 overflow-x-auto">
      {images.map(image => (
        <div className="bg-white w-96 h-60 mr-5" key={image}>
          <img src={image} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
};
export default HeroVer2;

// const HeroVer2 = () => {
//   const [imageIndex, setImageIndex] = useState(0);
//   const images = [greenImg, moneyImg, tradeImg, greenImg, moneyImg, tradeImg];
//   // 함수 -----------------------------------------------------------------------------

//   const prevImage = () => {
//     const prevIndex = imageIndex - 1;
//     setImageIndex(prevIndex);

//     if (prevIndex < 0) return setImageIndex(images.length - 1);
//   };

//   const nextImage = () => {
//     const nextIndex = imageIndex + 1;
//     setImageIndex(nextIndex);

//     if (nextIndex > images.length - 1) return setImageIndex(0);
//   };

//   // JSX-------------------------------------------------------------------------

//   return (
//     <div className="carousel bg-[var(--yellow-saffron)] h-80 w-full relative pb-10">
//       <div className="carousel-item mt-5 aspect-video mx-auto overflow-hidden">
//         <img src={images[imageIndex]} className="w-full h-full object-cover" />
//       </div>

//       <div className="absolute flex justify-between left-10 right-10 top-1/2">
//         <div
//           onClick={prevImage}
//           className="btn btn-circle  text-white bg-[var(--green-brunswick)] border-[var(--green-brunswick)] hover:bg-[var(--green-brunswick)]  hover:opacity-80"
//         >
//           ❮
//         </div>
//         <div
//           onClick={nextImage}
//           className="btn btn-circle text-white bg-[var(--green-brunswick)] border-[var(--green-brunswick)] hover:bg-[var(--green-brunswick)]  hover:opacity-80"
//         >
//           ❯
//         </div>
//       </div>
//       <div className="dot-container cursor-pointer flex absolute left-[50%] -ml-[24px] bottom-2">
//         {/* 50%만큼 움직이고 div길이 반만큼 다시 돌아와야 센터 : ml-[24px] */}
//         <GoDotFill
//           className="dot fill-[var(--green-brunswick)] text-[1.5rem]  hover:opacity-80  "
//           onClick={() => setImageIndex(0)}
//         />
//         <GoDotFill
//           className="dot  fill-[var(--green-brunswick)] text-[1.5rem] hover:opacity-80 "
//           onClick={() => setImageIndex(1)}
//         />
//         <GoDotFill
//           className="dot  fill-[var(--green-brunswick)] text-[1.5rem] hover:opacity-80 "
//           onClick={() => setImageIndex(2)}
//         />
//       </div>
//     </div>
//   );
// };

// export default HeroVer2;
