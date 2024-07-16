import { useEffect, useState } from 'react';
import Header from '../components/common/header/Header';
import MyTradeCards from '../components/common/card/MyTradeCards';
import {
  fetchMyBuyList,
  fetchMySellClose,
  fetchMySellOngoing,
} from '../api/UserTradeAPI';
import TradeTabs from '../components/common/button/TradeTab';
import Label from '../components/common/label/Label';
import { useNavigate } from 'react-router-dom';
import PaginationButton from '../components/common/pagination/PaginationButton';
import { useTranslation } from 'react-i18next';

const MyTradeList = () => {
  const { t } = useTranslation();
  const [mySellListOpen, setMySellListOpen] = useState(true);
  const [myBuyListOpen, setMyBuyListOpen] = useState(false);
  const [onSale, setOnSale] = useState(true);
  const [myList, setMyList] = useState([]);

  // 페이지 상태 추가
  const [pageBuy, setPageBuy] = useState(0);
  const [pageOngoing, setPageOngoing] = useState(0);
  const [pageClose, setPageClose] = useState(0);

  const [totalPageBuy, setTotalPageBuy] = useState(0);
  const [totalPageOngoing, setTotalPageOngoing] = useState(0);
  const [totalPageClose, setTotalPageClose] = useState(0);

  const [totalBuy, setTotalBuy] = useState(0);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalClose, setTotalClose] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      await handleDoneSale();
      await handleOnSale();
    };
    fetchAllData();
    if (mySellListOpen) {
      if (onSale) {
        handleOnSale();
      } else {
        handleDoneSale();
      }
    } else if (myBuyListOpen) {
      handleMyBuyListOpen();
    }
  }, [pageBuy, pageOngoing, pageClose]);

  const handleMySellListOpen = async () => {
    setMySellListOpen(true);
    setMyBuyListOpen(false);
    await handleOnSale();
  };

  const handleMyBuyListOpen = async () => {
    setMyBuyListOpen(true);
    setMySellListOpen(false);
    const dataBuyList = await fetchMyBuyList(pageBuy, navigate);
    setMyList(dataBuyList.content);
    setTotalPageBuy(dataBuyList.totalPages);
    setTotalBuy(dataBuyList.totalElements);
  };

  const handleOnSale = async () => {
    setOnSale(true);
    const ongoingList = await fetchMySellOngoing(pageOngoing, navigate);
    setMyList(ongoingList.content);
    setTotalPageOngoing(ongoingList.totalPages);
    setTotalOngoing(ongoingList.totalElements);
  };

  const handleDoneSale = async () => {
    setOnSale(false);
    const closeList = await fetchMySellClose(pageClose, navigate);
    setMyList(closeList.content);
    setTotalPageClose(closeList.totalPages);
    setTotalClose(closeList.totalElements);
  };

  return (
    <div>
      <TradeTabs
        mySellListOpen={mySellListOpen}
        myBuyListOpen={myBuyListOpen}
        handleSellListOpen={handleMySellListOpen}
        handleBuyListOpen={handleMyBuyListOpen}
        isAuction={false}
      />

      {/* 라벨------------------------------------------------------------------------ */}
      <Label breadcrumbItems={[t('HOME'), t('MY_PAGE'), t('MY_TRADE_HISTORY')]}>
        <div>
          {mySellListOpen && (
            <div>
              <div
                role="tab"
                onClick={handleOnSale}
                className={`tab ${onSale && 'border-2 scale-110 font-bold bg-green-brunswick text-white'}`}
              >
                {t('ONGOING_SELLING')} ({totalOngoing})
              </div>
              <div
                role="tab"
                onClick={handleDoneSale}
                className={`tab ${!onSale && 'border-2 scale-110 font-bold bg-green-brunswick text-white'}`}
              >
                {t('DONE_SELLING')} ({totalClose})
              </div>
            </div>
          )}
          {myBuyListOpen && (
            <div
              role="tab"
              className="tab border-2 scale-110 font-bold bg-green-brunswick text-white"
            >
              {t('DONE_BUYING')} ({totalBuy})
            </div>
          )}
        </div>
      </Label>

      <div className="mt-16 pt-4 lg:pt-5 pb-4 px-20 lg:pb-8 xl:px-40 xl:container 2xl:px-60">
        <div className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto">
          <MyTradeCards myList={myList} type="product" />
        </div>
      </div>

      <div className="container flex justify-center mb-16">
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

export default MyTradeList;
