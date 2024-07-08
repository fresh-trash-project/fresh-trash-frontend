import React, { useState } from 'react';
import RatingModal from '../modal/RatingModal';
const ReviewButton = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="flex justify-center items-center mt-2 ">
      <button onClick={openModal}>
        <p className="font-semibold">경매 거래후기 보내기</p>
      </button>
      {modalOpen && <RatingModal type="auction" id={id} onClose={closeModal} />}
    </div>
  );
};

export default ReviewButton;
