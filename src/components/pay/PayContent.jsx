import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailAuction } from '../../api/AuctionAPI';
import urlJoin from 'url-join';
import { globalFileAPI } from '../../../variable';
import { GoAlert } from 'react-icons/go';
import { AuctionPay } from '../../api/AuctionAPI';
import { CONSOLE } from '../../../Constants';
import { useTranslation } from 'react-i18next';
import Label from '../common/label/Label';
const PayContent = () => {
  const [auctionDetails, setAuctionDetails] = useState(null);
  const { auctionId } = useParams();
  const { t } = useTranslation();
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
    <div>
      <Label breadcrumbItems={[t('HOME'), t('AUCTION_PAYMENT')]}>
        <div
          role="tab"
          className="tab border-2 scale-110 font-bold bg-green-brunswick text-white"
        >
          {t('PAYMENT_PRODUCT_INFO')}
        </div>
      </Label>

      <div className="container">
        <div className="mt-20 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {' '}
          <div className="shrink-0 max-w-md mx-auto">
            {/* <img
              src={getImgeUrl(auctionDetails && auctionDetails.fileName)}
              alt={auctionDetails && auctionDetails.title}
            /> */}
            <img src="http://via.placeholder.com/640x480" />
          </div>
          {/* <div className="grid grid-cols-1  sm:mt-8 lg:mt-0"> */}
          <div className="grid grid-cols-1 m-12 lg:m-0">
            {/* <hr className="my-6 md:my-8  border-gray-200 dark:border-gray-800" /> */}
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {auctionDetails && auctionDetails.title}
              </h1>
            </div>
            <div className=" sm:items-center sm:gap-4 sm:flex justify-between">
              <div className=" flex items-center text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {auctionDetails && auctionDetails.finalBid}2000 {t('WON')}
              </div>
            </div>
            <div className=" sm:items-center sm:gap-4 sm:flex justify-between">
              <div className=" flex items-center text-2xl  text-gray-900 sm:text-xl dark:text-white">
                {auctionDetails && auctionDetails.content}lorem
              </div>
            </div>
            <div className=" sm:items-center sm:gap-4 sm:flex justify-between">
              <div className=" flex items-center text-2xl text-red-600 sm:text-xl dark:text-white">
                <GoAlert color="red" />
                {t('PAY_WITHIN_A_WEEK')}
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 md:my-8 border-2 border-gray-100 dark:border-gray-800" />

        <div className=" mt-4 pt-12 lg:pb-8 xl:px-40 xl:container  2xl:px-60">
          <div className="flex flex-col items-center justify-center pt-2 h-96 text-3xl border-4 border-gray-100 lg:pt-4  lg: px-4 sm:px-4 xl:px-2  xl:container mx-auto">
            <p className="mb-4">{t('AUCTION_WON')}</p>
            <p className="mb-4">
              {auctionDetails && auctionDetails.finalBid}
              {t('WON')}
              {t('PAY_NOW')}
            </p>
            <button
              className=" py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-brunswick rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={requestPay}
            >
              {t('PAY')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayContent;
