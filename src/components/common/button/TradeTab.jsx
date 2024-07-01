const TradeTabs = ({
  mySellListOpen,
  myBuyListOpen,
  handleSellListOpen,
  handleBuyListOpen,
}) => {
  return (
    <div className="navbar flex-row justify-end bg-base-100 shadow-md">
      <ul className="menu menu-horizontal bg-green-brunswick text-white rounded-box">
        <li
          className={`hover:scale-110 hover:font-bold ${
            mySellListOpen &&
            'bg-yellow-saffron rounded-xl text-green-brunswick font-semibold'
          }`}
          onClick={handleSellListOpen}
        >
          <p className="text-xs md:text-sm">나의 판매내역</p>
        </li>
        <li
          className={`hover:scale-110 hover:font-bold ${
            myBuyListOpen &&
            'bg-yellow-saffron rounded-xl text-green-brunswick font-semibold'
          }`}
          onClick={handleBuyListOpen}
        >
          <p className="text-xs md:text-sm">나의 구매내역</p>
        </li>
      </ul>
    </div>
  );
};

export default TradeTabs;
