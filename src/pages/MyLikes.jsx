import { useEffect, useState } from 'react';
import Header from '../components/common/header/Header';
import MyTradeCards from '../components/common/card/MyTradeCards';
import { fetchMyLikes } from '../api/UserLikesAPI';
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
      const dataMyLikes = await fetchMyLikes(selectedCategory, page);
      setMyLikes(dataMyLikes.content);
      setTotalLikes(dataMyLikes.totalElements);
      setTotalPage(dataMyLikes.totalPages);
    };
    getMyLikes();
  }, [selectedCategory, page]);

  //페이지네이션-------------------------------------
  const handlePreviousPage = async () => {
    setPage(page => Math.max(page - 1, 0)); // 이전 페이지로 이동
  };

  const handleNextPage = async () => {
    // 현재 페이지가 마지막 페이지보다 작은 경우에만 페이지를 증가시킵니다.
    if (page < totalPage - 1) {
      // 현재 페이지를 업데이트합니다.
      setPage(page => page + 1);
    }
  };

  //카테고리--------------------------------

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setPage(0); // 카테고리가 변경될 때 페이지를 0으로 초기화합니다.
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
            <li onClick={() => handleCategoryChange('ELECTRONICS')}>
              <p>전자기기</p>
            </li>
            <li onClick={() => handleCategoryChange('CLOTHING')}>
              <p>의류</p>
            </li>
            <li onClick={() => handleCategoryChange('HOME_KITCHEN')}>
              <p>생활/주방</p>
            </li>
            <li onClick={() => handleCategoryChange('BEAUTY')}>
              <p>뷰티</p>
            </li>
            <li onClick={() => handleCategoryChange('HEALTH')}>
              <p>건강</p>
            </li>
            <li onClick={() => handleCategoryChange('SPORTS')}>
              <p>스포츠</p>
            </li>
            <li onClick={() => handleCategoryChange('BOOKS')}>
              <p>도서</p>
            </li>
            <li onClick={() => handleCategoryChange('TOYS_GAMES')}>
              <p>장난감/게임</p>
            </li>
            <li onClick={() => handleCategoryChange('FURNITURE_DECOR')}>
              <p>가구/인테리어</p>
            </li>
            <li onClick={() => handleCategoryChange('PET_SUPPLIES')}>
              <p>반려동물용품</p>
            </li>
            <li onClick={() => handleCategoryChange('PLANT_SUPPLIES')}>
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
              className={`tab border-2 scale-110 font-bold bg-green-brunswick text-white`}
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
      <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto  ">
          <div className="grid gap-6 mt-12 justify-items-center md:grid-cols-2  lg:grid-cols-3 item_ list ">
            {myLikes
              .filter(
                myList =>
                  selectedCategory === '전체' ||
                  myList.wasteCategory === selectedCategory,
              )
              .map(myLikes => (
                <MyTradeCards key={myLikes.id} myList={myLikes} />
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
export default MyLikes;
