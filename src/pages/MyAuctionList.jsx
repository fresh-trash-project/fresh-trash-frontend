import { useState } from 'react';
import Nav from '../components/Home/Nav';
import MyTradeCards from '../components/MyList/MyTradeCards';

const MyAuctionList = () => {
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
      <Nav />
      <div className="navbar flex-row justify-between bg-base-100 shadow-md">
        <h1 className="text-lg md:text-xl">나의 경매내역</h1>
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
      <div role="tablist" className="tabs tabs-boxed mt-4">
        <div className="ml-8">
          {mySellListOpen && (
            <div>
              <div
                role="tab"
                onClick={handleOnSale}
                className={`tab ${onSale && 'border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white'}`}
              >
                경매중 (8)
              </div>
              <div
                role="tab"
                onClick={() => setOnSale(false)}
                className={`tab ${!onSale && 'border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white'}`}
              >
                경매완료 (13)
              </div>
            </div>
          )}
          {myBuyListOpen && (
            <div
              role="tab"
              className="tab border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white"
            >
              낙찰 10
            </div>
          )}
        </div>
      </div>

      {/* //!라벨에 따라 내용 표시---------------------------------------------------------- */}
      <MyTradeCards />
    </div>
  );
};

export default MyAuctionList;
