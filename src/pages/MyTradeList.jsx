import { useState } from 'react';
import Header from '../components/Home/Header';
import MyTradeCards from '../components/MyList/MyTradeCards';

const MyTradeList = () => {
  const [mySellListOpen, setMySellListOpen] = useState(true);
  const [myBuyListOpen, setMyBuyListOpen] = useState(false);
  const [onSale, setOnSale] = useState(true);

  const handleMySellListOpen = () => {
    setMySellListOpen(true);
    setMyBuyListOpen(false);
  };

  const handleMyBuyListOpen = () => {
    setMyBuyListOpen(true);
    setMySellListOpen(false);
  };

  const handleOnSale = () => {
    setOnSale(true);
  };

  console.log(onSale);

  return (
    <div>
      <Header />
      <div className="navbar flex-row justify-end bg-base-100 shadow-md">
        <ul
          className={`menu menu-horizontal bg-[var(--green-brunswick)] text-white rounded-box  `}
        >
          <li
            className={`hover:scale-110 hover:font-bold ${mySellListOpen && 'bg-[var(--yellow-saffron)] rounded-xl text-[var(--green-brunswick)] font-semibold'}`}
            onClick={handleMySellListOpen}
          >
            <p className=" text-xs md:text-sm">나의 판매내역</p>
          </li>
          <li
            className={`hover:scale-110 hover:font-bold ${myBuyListOpen && 'bg-[var(--yellow-saffron)] rounded-xl text-[var(--green-brunswick)] font-semibold'}`}
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
                  className={`tab ${onSale && 'border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white'}`}
                >
                  판매중 (8)
                </div>
                <div
                  role="tab"
                  onClick={() => setOnSale(false)}
                  className={`tab ${!onSale && 'border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white'}`}
                >
                  판매완료 (13)
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
                className="tab border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white"
              >
                거래완료 10
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

      {/* //!라벨에 따라 내용 표시---------------------------------------------------------- */}
      <MyTradeCards />
    </div>
  );
};
export default MyTradeList;
