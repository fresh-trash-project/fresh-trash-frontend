import { useEffect, useState } from 'react';
import Header from '../components/common/header/Header';
import MyTradeCards from '../components/common/card/MyTradeCards';
import {
  fetchMyBid,
  fetchMyAuctionClose,
  fetchMyAuctionOngoing,
} from '../api/UserAuctionAPI';
import PaginationButton from '../components/common/pagination/PaginationButton';
import TradeTabs from '../components/common/button/TradeTab';
import Label from '../components/common/label/Label';
import { useNavigate } from 'react-router-dom';

const MyAuctionList = () => {
  const [mySellListOpen, setMySellListOpen] = useState(true);
  const [myBuyListOpen, setMyBuyListOpen] = useState(false);
  const [onSale, setOnSale] = useState(true);
  const [myList, setMyList] = useState([]);
  const [pageBuy, setPageBuy] = useState(0);
  const [pageOngoing, setPageOngoing] = useState(0);
  const [pageClose, setPageClose] = useState(0);

  const [totalPageBuy, setTotalPageBuy] = useState(0);
  const [totalPageOngoing, setTotalPageOngoing] = useState(0);
  const [totalPageClose, setTotalPageClose] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalBuy, setTotalBuy] = useState(0);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalClose, setTotalClose] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllData = async () => {
      await handleDoneAuction();
      await handleOnAuction();
    };
    fetchAllData();
    if (mySellListOpen) {
      if (onSale) {
        handleOnAuction();
      } else {
        handleDoneAuction();
      }
    } else if (myBuyListOpen) {
      handleMyBuyListOpen();
    }
  }, [pageBuy, pageOngoing, pageClose]);
  // useEffect(() => {
  //   handleDoneAuction();
  //   handleOnAuction();
  // }, [pageBuy, pageOngoing, pageClose]);

  const handleMySellListOpen = async () => {
    setMySellListOpen(true);
    setMyBuyListOpen(false);
    await handleOnAuction();
  };

  const handleMyBuyListOpen = async () => {
    setMyBuyListOpen(true);
    setMySellListOpen(false);
    const dataBuyList = await fetchMyBid(pageBuy, navigate);
    setMyList(dataBuyList.content);
    setTotalPageBuy(dataBuyList.totalPages);
    setTotalBuy(dataBuyList.totalElements);
  };

  const handleOnAuction = async () => {
    setOnSale(true);
    const ongoingList = await fetchMyAuctionOngoing(pageOngoing, navigate);
    console.log(ongoingList);
    setMyList(ongoingList.content);
    setTotalPageOngoing(ongoingList.totalPages);
    setTotalOngoing(ongoingList.totalElements);
  };

  const handleDoneAuction = async () => {
    setOnSale(false);
    const closeList = await fetchMyAuctionClose(pageClose, navigate);
    console.log(closeList);
    setMyList(closeList.content);
    setTotalPageClose(closeList.totalPages);
    setTotalClose(closeList.totalElements);
  };

  return (
    <div>
      <Header />
      <TradeTabs
        mySellListOpen={mySellListOpen}
        myBuyListOpen={myBuyListOpen}
        handleSellListOpen={handleMySellListOpen}
        handleBuyListOpen={handleMyBuyListOpen}
        isAuction={true}
      />

      {/* 라벨------------------------------------------------------------------------ */}
      <Label breadcrumbItems={['홈', '마이페이지', '나의 경매내역']}>
        <div>
          {mySellListOpen && (
            <div>
              <div
                role="tab"
                onClick={handleOnAuction}
                className={`tab ${onSale && 'border-2 scale-110 font-bold bg-green-brunswick text-white'}`}
              >
                경매중 ({totalOngoing})
              </div>
              <div
                role="tab"
                onClick={handleDoneAuction}
                className={`tab ${!onSale && 'border-2 scale-110 font-bold bg-green-brunswick text-white'}`}
              >
                경매완료 ({totalClose})
              </div>
            </div>
          )}
          {myBuyListOpen && (
            <div
              role="tab"
              className="tab border-2 scale-110 font-bold bg-green-brunswick text-white"
            >
              낙찰 ({totalBuy})
            </div>
          )}
        </div>
      </Label>

      <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto  ">
          <MyTradeCards myList={myList} type="auction" />
        </div>
      </div>

      <div className=" container flex justify-center mb-16">
        {mySellListOpen && (
          <PaginationButton
            setPage={onSale ? setPageOngoing : setPageClose}
            page={onSale ? pageOngoing : pageClose}
            totalPages={onSale ? totalPageOngoing : totalPageClose}
          />
        )}
        {myBuyListOpen && (
          <PaginationButton
            setPage={setPageBuy}
            page={pageBuy}
            totalPages={totalPageBuy}
          />
        )}
      </div>
    </div>
  );
};
export default MyAuctionList;
