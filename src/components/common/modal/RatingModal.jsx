import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendProductReview, sendAuctionReview } from '../../../api/ReviewAPI';
import { useTranslation } from 'react-i18next';
import { CONSOLE } from '../../../../Constants';

const RatingModal = ({ type, id, onClose }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);

  const handleRatingChange = newRating => {
    setRating(newRating);
  };

  const handleContentChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (type === 'product') {
      await sendProductReview(id, rating, navigate);
    } else if (type === 'auction') {
      await sendAuctionReview(id, rating, content, navigate);
    }
    console.log(CONSOLE.SEND_RATING_SUCCESS, `: ${rating}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg min-w-sm md:w-72 lg:w-96">
        <h2 className="text-lg font-bold mb-4 flex justify-center md:text-2xl md:mb-7 lg:text-3xl lg:mb-9">
          {t('LEAVE_RATING')}
        </h2>
        <div className="flex justify-between mb-4 md:mb-7 lg:mb-9">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              className={`p-2 rounded md:text-lg md:px-3 lg:text-2xl lg:px-4 ${rating === num ? 'bg-yellow-saffron' : 'bg-gray-300'}`}
              onClick={() => handleRatingChange(num)}
            >
              {num}
            </button>
          ))}
        </div>
        {type === 'auction' && (
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full p-2 mb-4 border rounded"
            placeholder={t('WRITE_REVIEW')}
          />
        )}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2  md:py-2 md:text-lg lg:py-4 lg:text-xl"
            onClick={handleSubmit}
          >
            {t('SUBMIT')}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded  md:py-2 md:text-lg lg:py-4 lg:text-xl"
            onClick={onClose}
          >
            {t('CLOSE')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
