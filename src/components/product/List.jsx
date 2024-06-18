import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchProducts } from '../../api/ProductAPI';
import { signInState } from '../../recoil/RecoilSignIn';
import ProductCard from '../common/card/ProductCard';
import { useNavigate } from 'react-router-dom';
import PaginationButton from '../common/pagination/PaginationButton';
import ListNav from '../common/header/ListNav';
const List = () => {
  const navigate = useNavigate();
  //회원만 등록페이지 접근-------------------------------
  const [signIn, setSignIn] = useRecoilState(signInState);
  const handleRegistrationPageAccess = () => {
    if (!signIn) {
      alert('로그인한 회원만 등록 페이지에 접근할 수 있습니다.');
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
    const fetchData = async () => {
      try {
        let productList;
        if (searchType === 'title') {
          productList = await fetchProducts.titleSearch(
            searchInput,
            page,
            sort,
          );
        } else if (searchType === 'district') {
          productList = await fetchProducts.districtSearch(
            searchInput,
            page,
            sort,
          );
        } else if (selectedCategory === '전체') {
          productList = await fetchProducts.getPage(page, sort);
        } else {
          productList = await fetchProducts.category(
            selectedCategory,
            page,
            sort,
          );
        }

        setPosts(productList);
        setTotalPage(productList.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page, searchType, searchInput, sort, selectedCategory]);

  //페이지네이션-------------------------------------

  const handlePreviousPage = async () => {
    setPage(page => Math.max(page - 1, 0)); // 이전 페이지로 이동
  };

  // const handleNextPage = async () => {
  //   setPage(page => Math.min(page + 1, posts.totalPages - 1)); // 다음 페이지로 이동
  // };
  const handleNextPage = async () => {
    // 현재 페이지가 마지막 페이지보다 작은 경우에만 페이지를 증가시킵니다.
    if (page < posts.totalPages - 1) {
      // 현재 페이지를 업데이트합니다.
      setPage(page => page + 1);
    }
  };

  const handleSortByLikes = () => {
    setSort('likeCount,desc');
  };

  const handleSortByViews = () => {
    setSort('viewCount,desc');
  };

  const handleSortByCreated = () => {
    setSort('createdAt,desc');
  };
  //삭제------------------------------
  const handleDelete = async postId => {
    try {
      // API를 사용하여 제품 삭제
      await deletePost(postId);
      // 상태에서 해당 제품을 제거합니다.
      setPosts(posts.filter(product => product.id !== postId));
      console.log('제품이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다:', error);
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
        result = await fetchProducts.titleSearch(searchInput);
        setSearchResults(result);
      } else if (searchType === 'district') {
        result = await fetchProducts.districtSearch(searchInput);
        setSearchResults(result);
      }
    } catch (error) {
      console.error('검색 중 에러 발생:', error);
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
        product={posts}
      />

      <div className="mt-4 mr-8 float-end text-sm breadcrumbs">
        <ul>
          <li>홈</li>
          <li>애물단지 거래/나눔</li>
        </ul>
      </div>

      <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto  ">
          <div className="flex justify-end mb-4">
            <button className="mr-5" onClick={handleSortByViews}>
              조회순
            </button>
            <button className="mr-5" onClick={handleSortByLikes}>
              관심순
            </button>
            <button onClick={handleSortByCreated}>최신순</button>
          </div>
          <div className="grid gap-6 justify-items-center md:grid-cols-2  lg:grid-cols-3 item_ list ">
            {searchResults.length > 0
              ? searchResults &&
                searchResults
                  .filter(
                    product =>
                      selectedCategory === '전체' ||
                      product.productCategory === selectedCategory,
                  )
                  .map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDelete={handleDelete}
                    />
                  ))
              : posts.content &&
                posts.content
                  .filter(
                    product =>
                      selectedCategory === '전체' ||
                      product.productCategory === selectedCategory,
                  )
                  .map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDelete={handleDelete}
                    />
                  ))}
          </div>
        </div>
      </div>

      <div className=" container flex justify-center mb-16">
        <PaginationButton
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          // number={getPageNumbers}
          page={page}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};

export default List;
