// src/components/modal/RatingModal.jsx
import React, { useState } from 'react';

const RatingModal = ({ showModal, closeModal, submitRating }) => {
  const [rating, setRating] = useState(0);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${showModal ? 'block' : 'hidden'}`}
    >
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="bg-white p-8 rounded-lg z-10 ">
        <h2 className="text-2xl mb-4">평점을 남겨주세요</h2>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map(num => (
            <span
              key={num}
              className={`text-3xl cursor-pointer ${rating >= num ? 'text-yellow-saffron' : 'text-gray-300'}`}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => submitRating(rating)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            제출
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
