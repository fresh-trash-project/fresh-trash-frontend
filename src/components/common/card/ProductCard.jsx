import React from 'react';

const API_URL = import.meta.env.VITE_API_URL;
const ProductCard = ({ wastes }) => {
  const getImgeUrl = fileName => {
    return `${API_URL}/imgs/${fileName}`;
  };
  return (
    <div className="card w-80 bg-base-100 shadow md:w-72 xl:w-70 2xl:w-80 ">
      <figure className="w-full h-40 md:h-36 xl:h-48 2xl:h-56 overflow-hidden">
        <img
          src={getImgeUrl(wastes.fileName)}
          className="object-cover w-full h-full"
          alt={wastes.title}
        />
      </figure>
      <div className="card-body">
        <div className="bg-white w-20 text-[var(--yellow-saffron)] font-semibold text-xs py-1 px-2 border border-[var(--yellow-saffron)] rounded">
          {wastes.sellStatus}
        </div>

        <div className="card-title mb-3">{wastes.title}</div>

        <div className="flex justify-between mb-3">
          <div className="flex gap-2">
            <span>{wastes.address.state}</span>
            <span>{wastes.address.district}</span>
          </div>
          <div className="flex items-center">
            <button className="mr-2"></button>
            <div>관심수 {wastes.likeCount}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-2xl font-bold text-gray-900 ">
            {wastes.wastePrice}원
          </span>

          <a
            href={`/ProductDetail/${wastes.id}`}
            onClick={() => {
              window.location.href = `/ProductDetail/${wastes.id}`;
            }}
            className="text-white bg-green-900 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
          >
            상세보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
