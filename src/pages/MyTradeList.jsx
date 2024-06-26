import { useEffect, useState } from 'react';
import Header from '../components/common/header/Header';
import MyTradeCards from '../components/common/card/MyTradeCards';
import {
  fetchMyBuyList,
  fetchMySellClose,
  fetchMySellOngoing,
} from '../api/UserTradeAPI';
import { PaginationButton } from 'flowbite-react';

const MyTradeList = () => {
  const [mySellListOpen, setMySellListOpen] = useState(true);
  const [myBuyListOpen, setMyBuyListOpen] = useState(false);
  const [onSale, setOnSale] = useState(true);
  const [myList, setMyList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalBuy, setTotalBuy] = useState(0);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalClose, setTotalClose] = useState(0);

  useEffect(() => {
    handleOnSale();
  }, [page]);

  const handleMySellListOpen = async () => {
    setMySellListOpen(true);
    setMyBuyListOpen(false);
    handleOnSale();
  };

  const handleMyBuyListOpen = async () => {
    setMyBuyListOpen(true);
    setMySellListOpen(false);
    const dataBuyList = await fetchMyBuyList(page);
    setMyList(dataBuyList.content);
    setTotalPage(dataBuyList.totalPages);
    setTotalBuy(dataBuyList.totalElements);
  };

  const handleOnSale = async () => {
    setOnSale(true);
    const ongoingList = await fetchMySellOngoing(page);
    setMyList(ongoingList.content);
    setTotalPage(ongoingList.totalPages);
    setTotalOngoing(ongoingList.totalElements);
  };

  const handleDoneSale = async () => {
    setOnSale(false);
    const closeList = await fetchMySellClose(page);
    setMyList(closeList.content);
    setTotalPage(closeList.totalPages);
    setTotalClose(closeList.totalElements);
  };

  //페이지네이션-------------------------------------
  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 0)); // 이전 페이지로 이동
  };

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPage - 1)); // 다음 페이지로 이동
  };

  return (
    <div>
      <Header />
      <div className="navbar flex-row justify-end bg-base-100 shadow-md">
        <ul
          className={`menu menu-horizontal bg-green-brunswick text-white rounded-box  `}
        >
          <li
            className={`hover:scale-110 hover:font-bold ${mySellListOpen && 'bg-yellow-saffron rounded-xl text-green-brunswick font-semibold'}`}
            onClick={handleMySellListOpen}
          >
            <p className=" text-xs md:text-sm">나의 판매내역</p>
          </li>
          <li
            className={`hover:scale-110 hover:font-bold ${myBuyListOpen && 'bg-yellow-saffron rounded-xl text-green-brunswick font-semibold'}`}
            onClick={handleMyBuyListOpen}
          >
            <p className=" text-xs md:text-sm">나의 구매내역</p>
          </li>
        </ul>
      </div>

      {/* 라벨------------------------------------------------------------------------ */}
      <div role="tablist" className="tabs tabs-boxed shadow-md">
        <div className="px-4">
          {mySellListOpen && (
            <div className="flex justify-between">
              <div>
                <div
                  role="tab"
                  onClick={handleOnSale}
                  className={`tab ${onSale && 'border-2 scale-110 font-bold bg-green-brunswick text-white'}`}
                >
                  판매중 ({totalOngoing})
                </div>
                <div
                  role="tab"
                  onClick={handleDoneSale}
                  className={`tab ${!onSale && 'border-2 scale-110 font-bold bg-green-brunswick text-white'}`}
                >
                  판매완료 ({totalClose})
                </div>
              </div>
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>홈</li>
                  <li>마이페이지</li>
                  <li>나의 거래내역</li>
                </ul>
              </div>
            </div>
          )}
          {myBuyListOpen && (
            <div className="flex justify-between">
              <div
                role="tab"
                className="tab border-2 scale-110 font-bold bg-green-brunswick text-white"
              >
                거래완료 ({totalBuy})
              </div>

              <div className="text-sm breadcrumbs">
                <ul>
                  <li>홈</li>
                  <li>마이페이지</li>
                  <li>나의 거래내역</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto  ">
          <div className="grid gap-6 mt-12 justify-items-center md:grid-cols-2  lg:grid-cols-3 item_ list ">
            {myList.map(product => (
              <MyTradeCards key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className=" container flex justify-center mb-16">
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="join-item btn mr-4"
        >
          이전
        </PaginationButton>
        <PaginationButton
          onClick={handleNextPage}
          disabled={page === totalPage - 1}
          className="join-item btn ml-4"
        >
          다음
        </PaginationButton>
      </div>
    </div>
  );
};
export default MyTradeList;
