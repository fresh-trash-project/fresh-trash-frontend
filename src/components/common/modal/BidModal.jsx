import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import AuctionBid from '../../../api/AuctionAPI';
import { AuctionBid } from '../../../api/AuctionAPI';
const BidModal = ({ isOpen, onClose, data }) => {
  const [biddingPrice, setBiddingPrice] = useState('');
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const handleBiddingChange = e => {
    const value = e.target.value;
    if (/^[0-9]\d*$/.test(value) || value === '') {
      setBiddingPrice(value);
    } else {
      alert('양수를 입력하세요.');
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();

    await AuctionBid(biddingPrice, auctionId, navigate);
  };
  if (!isOpen) return null;
  return (
    <dialog open className="modal">
      <div className="modal-box max-h-screen ">
        <p className="font-bold text-lg">경매 입찰</p>
        <div className="py-4">
          <p>입찰 상품</p>
          <div className="mt-3 p-4 bg-gray-100">
            <p>제목 {data.title}</p>
            <p>마감 일자 {data.endedAt}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="mt-3">입찰하기</p>
          <div className="mt-3 p-4 bg-gray-100">
            <p>현재가 {data.finalBid}</p>
            <label>입찰금액</label>
            <input
              type="number"
              onChange={handleBiddingChange}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-7 ml-2 border-none"
            />
          </div>
          <div className="modal-action">
            <button className="btn" type="submit">
              입찰하기
            </button>
            <button className="btn" onClick={onClose}>
              닫기
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BidModal;
