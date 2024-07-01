import React, { useState, useEffect } from 'react';
import { globalFileAPI } from '../../../../variable';
import urlJoin from 'url-join';
import DateCounter from '../counter/DateCounter';
const ProductCard = ({ product, auction }) => {
  const data = product || auction;

  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };

  return (
    <div className="card w-80 bg-base-100 shadow md:w-72 xl:w-70 2xl:w-80 ">
      <figure className="w-full h-40 md:h-36 xl:h-48 2xl:h-56 overflow-hidden">
        {data.fileName && (
          <img
            src={getImgeUrl(data.fileName)}
            className="object-cover w-full h-full"
            alt={data.title}
          />
        )}
      </figure>
      <div className="card-body">
        <div className="bg-white w-20 text-purple-dpurple font-semibold text-center text-xs py-1 px-2 border border-purple-dpurple rounded">
          {data.productStatus}
        </div>

        <div className="card-title mb-3">{data.title}</div>

        <div className="flex justify-between mb-3">
          {data.address && (
            <div className="flex gap-2">
              <span>{data.address.state}</span>
              <span>{data.address.district}</span>
            </div>
          )}

          {product ? (
            <div className="flex items-center">
              <button className="mr-2"></button>
              <div>관심수 {data.likeCount}</div>
            </div>
          ) : (
            <div className="flex items-center">
              <div>
                <DateCounter
                  startDate={data.startedAt}
                  endDate={data.endedAt}
                />
              </div>
            </div>
          )}
        </div>

        {product ? (
          <div className="flex justify-between">
            <span className="text-2xl font-bold text-gray-900 ">
              {data.productPrice}원
            </span>
            <a
              href={`/ProductDetail/${data.id}`}
              onClick={() => {
                window.location.href = `/ProductDetail/${data.id}`;
              }}
              className="text-white bg-green-900 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
            >
              상세보기
            </a>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-2xl font-bold text-gray-900 ">
              {data.finalBid}원
            </span>
            <a
              href={`/AuctionDetail/${data.id}`}
              onClick={() => {
                window.location.href = `/AuctionDetail/${data.id}`;
              }}
              className="text-white bg-green-900 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
            >
              상세보기
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
