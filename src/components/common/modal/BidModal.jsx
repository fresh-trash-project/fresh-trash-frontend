import React from 'react';

const BidModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  return (
    <dialog open className="modal">
      <div className="modal-box max-h-screen ">
        <p className="font-bold text-lg">경매 입찰</p>
        <div className="py-4">
          <p>입찰 상품</p>
          <div className="mt-3 p-4 bg-gray-100">
            <p>제목 {data.title}</p>
            <p>내용 {data.content}</p>
            <p>마감 일자 {data.endedAt}</p>
          </div>
          <p>입찰하기</p>
          <div className="mt-3 p-4 bg-gray-100">
            <p>현재가 {data.finalBid}</p>
            <p>
              입찰금액
              <input type="number" className="h-7 ml-2 border-none" />
            </p>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn">입찰하기</button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BidModal;
