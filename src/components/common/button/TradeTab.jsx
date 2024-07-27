import { useTranslation } from 'react-i18next';

const TradeTabs = ({
  mySellListOpen,
  myBuyListOpen,
  handleSellListOpen,
  handleBuyListOpen,
  isAuction,
}) => {
  const { t } = useTranslation();

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
          <p className="text-xs md:text-sm">
            {isAuction ? t('MY_AUCTION_HISTORY') : t('MY_SELL_HISTORY')}
          </p>
        </li>
        <li
          className={`hover:scale-110 hover:font-bold ${
            myBuyListOpen &&
            'bg-yellow-saffron rounded-xl text-green-brunswick font-semibold'
          }`}
          onClick={handleBuyListOpen}
        >
          <p className="text-xs md:text-sm">
            {isAuction ? t('MY_WINNING_HISTORY') : t('MY_BUY_HISTORY')}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default TradeTabs;
