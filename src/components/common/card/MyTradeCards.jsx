import ProductCard from './ProductCard';
import RatingModal from '../modal/RatingModal';
import React, { useState } from 'react';

const MyTradeCards = ({ myList, type, myBuyListOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openModal = id => {
    setSelectedItemId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItemId(null);
    setModalOpen(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
      {myList.map(item => (
        <div key={item.id}>
          <ProductCard
            key={item.id}
            product={type === 'product' ? item : undefined}
            auction={type === 'auction' ? item : undefined}
          />
          {myBuyListOpen && (
            <div className="text-center mt-2">
              <button
                onClick={() => openModal(item.id)}
                style={{ display: 'inline-block', margin: 'auto' }}
              >
                <p className="font-semibold">경매 거래후기 보내기</p>
              </button>
            </div>
          )}
        </div>
      ))}
      {modalOpen && selectedItemId && (
        <RatingModal type="auction" id={selectedItemId} onClose={closeModal} />
      )}
    </div>
  );
};

export default MyTradeCards;
