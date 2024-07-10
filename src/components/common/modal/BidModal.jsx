import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import AuctionBid from '../../../api/AuctionAPI';
import { AuctionBid } from '../../../api/AuctionAPI';
import { useTranslation } from 'react-i18next';

const BidModal = ({ isOpen, onClose, data }) => {
  const { t } = useTranslation();
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
        <p className="font-bold text-lg">{t('BID_AUCTION')}</p>
        {/* <p className="font-bold text-lg">경매 입찰</p> */}
        <div className="py-4">
          <p>{t('BID_ITEM')}</p>
          <div className="mt-3 p-4 bg-gray-100">
            <p>
              {t('TITLE')} {data.title}
            </p>
            <p>
              {t('END_DATE')} {data.endedAt}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="mt-3">{t('PLACE_BID')}</p>
          <div className="mt-3 p-4 bg-gray-100">
            <p>
              {t('CURRENT_PRICE')} {data.finalBid}
            </p>
            <label>{t('BID_AMOUNT')}</label>
            <input
              type="number"
              onChange={handleBiddingChange}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-7 ml-2 border-none"
            />
          </div>
          <div className="modal-action">
            <button className="btn" type="submit">
              {t('PLACE_BID')}
            </button>
            <button className="btn" onClick={onClose}>
              {t('CLOSE')}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BidModal;
