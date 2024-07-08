import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailAuction } from '../../api/AuctionAPI';
import urlJoin from 'url-join';
import { globalFileAPI } from '../../../variable';
import { GoAlert } from 'react-icons/go';
import { AuctionPay } from '../../api/AuctionAPI';
import { CONSOLE } from '../../../Constants';
const PayContent = () => {
  const [auctionDetails, setAuctionDetails] = useState(null);
  const { auctionId } = useParams();
  useEffect(() => {
    // const IMP = window.IMP; // 생략 가능
    // IMP.init('imp37862406'); // 예: imp00000000a
    const fetchDetail = async () => {
      try {
        const details = await detailAuction(auctionId);
        setAuctionDetails(details);
      } catch (error) {
        console.error('에러발생');
      }
    };
    fetchDetail();
  }, [auctionId]);

  const requestPay = async () => {
    const IMP = window.IMP;
    IMP.init('imp37862406');
    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 가맹점 고유 주문번호
      name: `${auctionDetails && auctionDetails.title}`,
      amount: `${auctionDetails && auctionDetails.finalBid}`, // 결제금액
      buyer_email: 'buyer@example.com',
      buyer_name: `${auctionDetails.memberResponse && auctionDetails.memberResponse.nickname}`,
      buyer_tel: '010-1234-5678',
      buyer_addr: `${auctionDetails.memberResponse && auctionDetails.memberResponse.address}`,
      buyer_postcode: `${auctionDetails.memberResponse && auctionDetails.memberResponse.zipcode}`,
    };
    console.log(data);
    await AuctionPay(auctionId);
    IMP.request_pay(data, rsp => {
      if (rsp.success) {
        // 결제 성공 시 로직
        console.log(CONSOLE.PAY_SUCCESS, rsp);
      } else {
        // 결제 실패 시 로직
        console.error(CONSOLE.PAY_ERROR, rsp);
      }
    });
  };
  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };
  return (
    <div className="container">
      <div className="flex flex-row-reverse mr-16 mt-4 text-sm breadcrumbs 2xl:ml-8">
        <ul>
          <li>홈</li>
          <li>애물단지 경매 결제</li>
        </ul>
      </div>
      <div className="flex justify-center items-center text-xl font-semibold bg-gray-100 w-40 h-12 rounded-t-md p-2">
        <p>결제 상품 정보</p>
      </div>
      <hr className="mb-8 md: border-2 border-gray-100 dark:border-gray-800" />
      {/* <p className="text-xl font-semibold my-6">결제 상품 정보</p> */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        {' '}
        <div className="shrink-0 max-w-md mx-auto">
          <img
            src={getImgeUrl(auctionDetails && auctionDetails.fileName)}
            alt={auctionDetails && auctionDetails.title}
          />
        </div>
        <div className="grid grid-cols-1 sm:mt-8 lg:mt-0">
          {/* <hr className="my-6 md:my-8  border-gray-200 dark:border-gray-800" /> */}
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {auctionDetails && auctionDetails.title}
            </h1>
          </div>
          <div className=" sm:items-center sm:gap-4 sm:flex justify-between">
            <div className=" flex items-center text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {auctionDetails && auctionDetails.finalBid}원
            </div>
          </div>
          <div className=" sm:items-center sm:gap-4 sm:flex justify-between">
            <div className=" flex items-center text-2xl  text-gray-900 sm:text-xl dark:text-white">
              {auctionDetails && auctionDetails.content}
            </div>
          </div>
          <div className=" sm:items-center sm:gap-4 sm:flex justify-between">
            <div className=" flex items-center text-2xl text-red-600 sm:text-xl dark:text-white">
              <GoAlert color="red" />
              일주일 이내로 결제하세요.
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 md:my-8 border-2 border-gray-100 dark:border-gray-800" />

      <div className=" mt-4 pt-12 lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className="flex flex-col items-center justify-center pt-2 h-96 text-3xl border-4 border-gray-100 lg:pt-4  lg: px-4 sm:px-4 xl:px-2  xl:container mx-auto">
          <p className="mb-4">낙찰되었습니다.</p>
          <p className="mb-4">
            {auctionDetails && auctionDetails.finalBid}원을 입금하세요.
          </p>
          <button
            className=" py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-brunswick rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100"
            onClick={requestPay}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayContent;
