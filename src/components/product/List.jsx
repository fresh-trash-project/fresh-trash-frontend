import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchProducts } from '../../api/ProductAPI';
import { signInState } from '../../recoil/RecoilSignIn';
import ProductCard from '../common/card/ProductCard';
import { useNavigate } from 'react-router-dom';
import PaginationButton from '../common/pagination/PaginationButton';
import ListNav from '../common/header/ListNav';
import Label from '../common/label/Label';
import { toast } from 'react-toastify';
import { CONSOLE } from '../../../Constants';
const List = () => {
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
        console.error(CONSOLE.FETCH_POSTS_ERROR, error);
      }
    };

    fetchData();
  }, [page, searchType, searchInput, sort, selectedCategory]);

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
      await deletePost(postId, navigate);
      // 상태에서 해당 제품을 제거합니다.
      setPosts(posts.filter(product => product.id !== postId));
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
        result = await fetchProducts.titleSearch(searchInput);
        setSearchResults(result);
      } else if (searchType === 'district') {
        result = await fetchProducts.districtSearch(searchInput);
        setSearchResults(result);
      }
    } catch (error) {
      console.error(error);
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
      <Label breadcrumbItems={['홈', '애물단지 거래/나눔']}>
        <div className="flex ">
          <button
            className={`tab ${
              sort === 'viewCount,desc'
                ? ' border-2 scale-110 font-bold bg-green-brunswick text-white'
                : ''
            }`}
            onClick={handleSortByViews}
          >
            조회순
          </button>
          <button
            className={`tab ${
              sort === 'likeCount,desc'
                ? 'border-2  scale-110 font-bold bg-green-brunswick text-white'
                : ''
            }`}
            onClick={handleSortByLikes}
          >
            관심순
          </button>
          <button
            className={`tab  ${
              sort === 'createdAt,desc'
                ? 'border-2 scale-110 font-bold bg-green-brunswick text-white'
                : ''
            }`}
            onClick={handleSortByCreated}
          >
            최신순
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

      {/* <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
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
