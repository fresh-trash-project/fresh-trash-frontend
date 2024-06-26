import React from 'react';
import { useParams } from 'react-router-dom';
const PayContent = () => {
  return (
    <div>
      <div className="mr-8 float-end text-sm breadcrumbs">
        <ul>
          <li>홈</li>
          <li>애물단지 경매 결제</li>
        </ul>
      </div>
      <div className=" mt-8 pt-12     ">
        <div className="p-8 h-96 border-4 border-gray-100 flex">
          <img src="https://placehold.jp/300x300.png" alt="" />
          <div className=" ml-12 text-2xl">
            <p className="mb-12">제목</p>
            <p>가격</p>
          </div>
        </div>
      </div>
      <div className=" mt-4 pt-12 lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className="flex flex-col items-center justify-center pt-2 h-96 text-3xl lg:pt-4  lg: px-4 sm:px-4 xl:px-2  xl:container mx-auto">
          <p className="mb-4">낙찰되었습니다.</p>
          <p className="mb-4">1000원을 입금하세요. </p>
          <button className=" py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100">
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayContent;
