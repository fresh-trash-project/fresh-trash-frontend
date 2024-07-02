import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendProductReview, sendAuctionReview } from '../../../api/ReviewAPI';

const RatingModal = ({ type, id, onClose }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleRatingChange = newRating => {
    setRating(newRating);
  };

  const handleContentChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (type === 'product') {
        await sendProductReview(id, rating, navigate);
      } else if (type === 'auction') {
        await sendAuctionReview(id, rating, content, navigate);
      }
      console.log(`평점 제출: ${rating}`);
      onClose();
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Rate this!</h2>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              className={`p-2 rounded ${rating === num ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
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
            placeholder="Write your review here..."
          />
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSubmit}
        >
          제출
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
