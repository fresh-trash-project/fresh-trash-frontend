import { useEffect, useState } from 'react';
import Header from '../components/Home/Header';
import MyTradeCards from '../components/MyList/MyTradeCards';
import { fetchMyLikes } from '../api/UserTradeAPI';
import { PaginationButton } from 'flowbite-react';

const MyLikes = () => {
  const [myLikes, setMyLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [filteredLikes, setFilteredLikes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    const getMyLikes = async () => {
      const dataMyLikes = await fetchMyLikes(page);
      setMyLikes(dataMyLikes.content);
      setTotalLikes(dataMyLikes.totalElements);
      setTotalPage(dataMyLikes.totalPages);

      // const handleCategoryChange = category => {
      //   setSelectedCategory(category);
      //   setPage(0); // 페이지를 첫 페이지로 초기화
      //   const filtered =
      //     selectedCategory === '전체'
      //       ? myLikes
      //       : myLikes.filter(
      //           data => data.content.wasteCategory === selectedCategory,
      //         );
      //   console.log(filtered);
      //   setFilteredLikes(myLikes);
      // };
    };
    getMyLikes();
  }, [page]);

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
      <div className="navbar flex-row justify-between bg-white shadow-md px-4">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn bg-gray-200">
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
      </div>

      {/* 라벨------------------------------------------------------------------------ */}
      <div role="tablist" className="tabs tabs-boxed shadow-md ">
        <div className="px-4">
          <div className="flex justify-between">
            <div
              role="tab"
              className={`tab border-2 scale-110 font-bold bg-[var(--green-brunswick)] text-white`}
            >
              찜 ({totalLikes})
            </div>
            <div className=" text-sm breadcrumbs">
              <ul>
                <li>홈</li>
                <li>마이페이지</li>
                <li>나의 관심목록</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <MyTradeCards myList={myLikes} />

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
export default MyLikes;
