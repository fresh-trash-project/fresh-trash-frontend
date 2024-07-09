import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoFootsteps } from 'react-icons/io5';

const Rating = ({ averageRating }) => {
  const [greenBarWidth, setGreenBarWidth] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const updateGreenBarWidth = () => {
      const ratingBarElement = document.querySelector('.ratingBar');
      if (ratingBarElement) {
        setGreenBarWidth(ratingBarElement.offsetWidth);
      }
    };

    updateGreenBarWidth();
    window.addEventListener('resize', updateGreenBarWidth);
    return () => window.removeEventListener('resize', updateGreenBarWidth);
  }, []);

  const iconWidth = 30; // 발자국 아이콘의 길이 (px)
  const maxFootstep = greenBarWidth - iconWidth;
  const footstep = (averageRating / 5) * maxFootstep;

  // -------------------------------------------------------------------------------------------------------
  return (
    <div className="rating flex flex-col mt-14">
      <div className="flex justify-between mb-2">
        <div className="my-rating rounded-lg p-2 bg-green-paleaqua ">
          {t('MY_RATING')}
        </div>
        <div className="rating-value rounded-lg p-2 bg-green-paleaqua ">
          {averageRating + ' / 5'}
        </div>
      </div>
      <div>
        <div className="ratingBar h-8 rounded-lg bg-gradient-to-br from-green-200 via-green-700 to-green-950 ">
          <IoFootsteps
            className={`text-3xl text-white-ivory`}
            style={{ transform: `translateX(${footstep}px) rotate(90deg)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Rating;

//   포지션을 사용했을 경우
//   let footstep = (averageRating / 5) * 100 - (30 / greenBarWidth) * 100;
//   if (averageRating === 0) {
//     footstep = (averageRating / 5) * 100;
//   }

//   return (
//     <div className="rating flex flex-col mt-14">
//       ...
//       <div>
//         <div className="ratingBar relative h-8 rounded-lg bg-gradient-to-br from-green-200 via-green-700 to-green-950 ">
//           <IoFootsteps
//             className={`absolute text-3xl rotate-90 text-white-ivory`}
//             style={{ left: `${footstep}%` }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
