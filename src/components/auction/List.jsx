import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchAuctions } from '../../api/AuctionAPI';
import { signInState } from '../../recoil/RecoilSignIn';
import ProductCard from '../common/card/ProductCard';
import { useNavigate } from 'react-router-dom';
import PaginationButton from '../common/pagination/PaginationButton';
import Label from '../common/label/Label';
import { toast } from 'react-toastify';
import { MESSAGES, CONSOLE } from '../../../Constants';
import ListNav from '../common/header/ListNav';
import { useTranslation } from 'react-i18next';
const List = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //회원만 등록페이지 접근-------------------------------
  const [signIn, setSignIn] = useRecoilState(signInState);
  const handleRegistrationPageAccess = () => {
    if (!signIn) {
      toast.error('로그인한 회원만 등록 페이지에 접근할 수 있습니다.');
    } else {
      navigate('/ProductAdd');
    }
  };

  //fetch 호출-----------------------------------
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [sort, setSort] = useState('createdAt,desc');
  useEffect(() => {
    const fetchData = async category => {
      try {
        let auctionList;
        if (searchType === 'title') {
          auctionList = await fetchAuctions.titleSearch(
            searchInput,
            page,
            sort,
          );
        } else if (selectedCategory === '전체') {
          auctionList = await fetchAuctions.getPage(page, sort);
        } else {
          auctionList = await fetchAuctions.category(
            selectedCategory,
            page,
            sort,
          );
        }

        setPosts(auctionList);
        setTotalPage(auctionList.totalPages);
      } catch (error) {
        console.error(CONSOLE.FETCH_POSTS_ERROR, error);
      }
    };

    fetchData();
  }, [page, searchType, searchInput, sort, selectedCategory]);

  //가격순
  const handleSortByFinalBid = () => {
    setSort('finalBid,desc');
  };
  //죄회순
  const handleSortByViews = () => {
    setSort('viewCount,desc');
  };
  //최신순
  const handleSortByCreated = () => {
    setSort('createdAt,desc');
  };
  //삭제------------------------------
  const handleDelete = async postId => {
    try {
      // API를 사용하여 제품 삭제
      await deletePost(postId, navigate);
      // 상태에서 해당 제품을 제거합니다.
      setPosts(posts.filter(wastes => wastes.id !== postId));
      console.log(CONSOLE.DELETE_SUCCESS);
    } catch (error) {
      console.error(CONSOLE.DELETE_ERROR, error);
    }
  };

  //카테고리--------------------------------

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setPage(0); // 카테고리가 변경될 때 페이지를 0으로 초기화합니다.
  };
  //검색-------------------------------------------------

  const handleSearch = async () => {
    try {
      let result;
      if (searchType === 'title') {
        result = await fetchAuctions.titleSearch(searchInput);
        setSearchResults(result);
      } else if (searchType === 'district') {
        result = await fetchAuctions.districtSearch(searchInput);
        setSearchResults(result);
      }
    } catch (error) {
      console.error(CONSOLE.SEARCH_ERROR, error);
    }
  };

  return (
    <div>
      <ListNav
        setSearchType={setSearchType}
        setSearchInput={setSearchInput}
        setIsSearchVisible={setIsSearchVisible}
        handleCategoryChange={handleCategoryChange}
        isSearchVisible={isSearchVisible}
        searchInput={searchInput}
        handleSearch={handleSearch}
        auction={posts}
      />

      <Label breadcrumbItems={[t('HOME'), t('AUCTION_LIST')]}>
        <div className="flex ">
          <button
            className={`tab ${
              sort === 'viewCount,desc'
                ? ' border-2 scale-110 font-bold bg-green-brunswick text-white'
                : ''
            }`}
            onClick={handleSortByViews}
          >
            {t('BY_VIEWS')}
          </button>
          <button
            className={`tab ${
              sort === 'finalBid,desc'
                ? ' border-2 scale-110 font-bold bg-green-brunswick text-white'
                : ''
            }`}
            onClick={handleSortByFinalBid}
          >
            {t('BY_PRICE')}
          </button>
          <button
            className={`tab  ${
              sort === 'createdAt,desc'
                ? 'border-2 scale-110 font-bold bg-green-brunswick text-white'
                : ''
            }`}
            onClick={handleSortByCreated}
          >
            {t('BY_NEWEST')}
          </button>
        </div>
      </Label>

      <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto  ">
          <div className="grid gap-6 justify-items-center  md:grid-cols-2  lg:grid-cols-3 item_ list ">
            {searchResults.length > 0
              ? searchResults &&
                searchResults
                  .filter(
                    auction =>
                      selectedCategory === '전체' ||
                      auction.productCategory === selectedCategory,
                  )
                  .map(auction => (
                    <ProductCard
                      key={auction.id}
                      auction={auction}
                      onDelete={handleDelete}
                    />
                  ))
              : posts.content &&
                posts.content
                  .filter(
                    auction =>
                      selectedCategory === '전체' ||
                      auction.productCategory === selectedCategory,
                  )
                  .map(auction => (
                    <ProductCard
                      key={auction.id}
                      auction={auction}
                      onDelete={handleDelete}
                    />
                  ))}
          </div>
        </div>
      </div>

      {/* <div className="mt-4 mr-8 float-end text-sm breadcrumbs">
        <ul>
          <li>홈</li>
          <li>애물단지 경매</li>
        </ul>
      </div>

      <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto  ">
          <div className="flex justify-end mb-4">
            <button className="mr-5" onClick={handleSortByViews}>
              조회순
            </button>
            <button className="mr-5" onClick={handleSortByFinalBid}>
              가격순
            </button>
            <button onClick={handleSortByCreated}>최신순</button>
          </div>
          <div className="grid gap-6 justify-items-center md:grid-cols-2  lg:grid-cols-3  ">
            {searchResults.length > 0
              ? searchResults &&
                searchResults
                  .filter(
                    auction =>
                      selectedCategory === '전체' ||
                      auction.productCategory === selectedCategory,
                  )
                  .map(auction => (
                    <ProductCard
                      key={auction.id}
                      auction={auction}
                      onDelete={handleDelete}
                    />
                  ))
              : posts.content &&
                posts.content
                  .filter(
                    auction =>
                      selectedCategory === '전체' ||
                      auction.productCategory === selectedCategory,
                  )
                  .map(auction => (
                    <ProductCard
                      key={auction.id}
                      auction={auction}
                      onDelete={handleDelete}
                    />
                  ))}
          </div>
        </div> 
      </div> */}

      <div className=" container flex justify-center mb-16">
        <PaginationButton
          setPage={setPage}
          page={page}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};

export default List;
