import { useState } from 'react';
import Nav from '../components/Home/Nav';
import MyTradeCards from '../components/MyList/MyTradeCards';

const MyLikes = () => {
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
      <div className="navbar flex-row justify-between bg-white shadow-md">
        {/* //! 카테고리 컴포넌트화 ---------------------------- */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn bg-white">
            카테고리
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => handleCategoryChange('전체')}>
              <p>전체</p>
            </li>
            <li onClick={() => handleCategoryChange('전자기기')}>
              <p>전자기기</p>
            </li>
            <li onClick={() => handleCategoryChange('의류')}>
              <p>의류</p>
            </li>
            <li onClick={() => handleCategoryChange('생활/주방')}>
              <p>생활/주방</p>
            </li>
            <li onClick={() => handleCategoryChange('뷰티')}>
              <p>뷰티</p>
            </li>
            <li onClick={() => handleCategoryChange('스포츠')}>
              <p>스포츠</p>
            </li>
            <li onClick={() => handleCategoryChange('도서')}>
              <p>도서</p>
            </li>
            <li onClick={() => handleCategoryChange('장난감/게임')}>
              <p>장난감/게임</p>
            </li>
            <li onClick={() => handleCategoryChange('가구/인테리어')}>
              <p>가구/인테리어</p>
            </li>
            <li onClick={() => handleCategoryChange('반려동물용품')}>
              <p>반려동물용품</p>
            </li>
            <li onClick={() => handleCategoryChange('식물')}>
              <p>식물</p>
            </li>
          </ul>
        </div>
        <div className="mt-4 text-sm breadcrumbs pl-5">
          <ul>
            <li>홈</li>
            <li>마이페이지</li>
            <li>나의 관심목록</li>
          </ul>
        </div>
      </div>

      {/* 라벨------------------------------------------------------------------------ */}
      <div role="tablist" className="tabs tabs-boxed shadow-md ">
        <div>
          <div
            role="tab"
            onClick={handleOnSale}
            className={`tab ${onSale && 'border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white'}`}
          >
            찜 (8)
          </div>
        </div>
      </div>

      {/* //!라벨에 따라 내용 표시---------------------------------------------------------- */}
      <MyTradeCards />
    </div>
  );
};
export default MyLikes;
