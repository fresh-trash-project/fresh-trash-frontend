import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
// import { fetchProducts } from '../../api/WastesApi';
import { fetchWastes } from '../../api/WastesApi';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { signInState } from '../../recoil/RecoilSignIn';
// import Pagination from '../common/pagination/Pagination';
// import Pagination2 from '../common/pagination/Pagination2';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { PaginationButton } from 'flowbite-react';
const ITEMS_PER_PAGE = 6;
const ListTest = () => {
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const productList = await fetchProducts(page);

  //       setPosts(productList);
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [page]);

  // const [posts, setPosts] = useState([]);
  // const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await fetchWastes.getPage(page);

        setPosts(productList);
      } catch (error) {}
    };

    fetchData();
  }, [page]);

  //페이지네이션-------------------------------------
  const handlePreviousPage = () => {
    setPage(page => Math.max(page - 1, 0)); // 이전 페이지로 이동
  };

  const handleNextPage = () => {
    setPage(page => Math.min(page + 1, posts.totalPages - 1)); // 다음 페이지로 이동
  };

  //관심순--------------------------
  // const [sortedLike, setSortedLike] = useState([]);
  const handleSortByLikes = async () => {
    try {
      const sortedList = await fetchWastes.likeCount('likeCount,desc');
      setPosts(sortedList);
      console.log('관심순으로 정렬', sortedList);
    } catch (error) {
      console.error('Error sorting by likes:', error);
    }
  };
  //조회순---------------------------
  const handleSortByViews = async () => {
    try {
      const sortedList = await fetchWastes.likeCount('viewCount,desc');
      setPosts(sortedList);
      console.log('조회순으로 정렬', sortedList);
    } catch (error) {
      console.error('Error sorting by viewCount:', error);
    }
  };
  //날짜순----------------------------
  const handleSortByCreated = async () => {
    try {
      const sortedList = await fetchWastes.likeCount('createdAt,desc');
      setPosts(sortedList);
      console.log('날짜순으로 정렬', sortedList);
    } catch (error) {
      console.error('Error sorting by createdAt:', error);
    }
  };
  // useEffect(() => {
  //   setPosts(sortedLike); // 정렬된 제품 목록으로 업데이트
  //   console.log('관심순 정렬 성공', sortedLike);
  // }, [sortedLike]);

  // const handlePreviousPage = async () => {
  //   try {
  //     await fetchWastes.getPage(page - 1);
  //     setPage(page - 1);
  //   } catch (error) {
  //     console.error('Error fetching previous page:', error);
  //   }
  // };

  // // 다음 페이지로 이동하는 함수
  // const handleNextPage = async () => {
  //   try {
  //     await fetchWastes.getPage(page + 1);
  //     setPage(page + 1);
  //   } catch (error) {
  //     console.error('Error fetching next page:', error);
  //   }
  // };

  //삭제------------------------------
  const handleDelete = async postId => {
    try {
      // API를 사용하여 제품 삭제
      await deletePost(postId);
      // 상태에서 해당 제품을 제거합니다.
      setPosts(posts.filter(wastes => wastes.id !== postId));
      console.log('제품이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다:', error);
    }
  };

  //카테고리--------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredPosts =
    selectedCategory === '전체'
      ? posts
      : posts.content.filter(
          post => post.content.wasteCategory === selectedCategory,
        );

  // 카테고리를 변경하는 함수
  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setCurrentPage(1); // 페이지를 첫 페이지로 초기화
  };

  return (
    <div>
      <div className="navbar flex-row justify-between bg-base-100 shadow-md">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
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
        <div className="flex">
          <div className="join">
            <select className="select select-bordered join-item">
              <option value="address">지역</option>
              <option value="title">제목</option>
            </select>
            <div>
              <div>
                <input
                  className="input input-bordered join-item"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="indicator">
              <button className="btn join-item bg-green-900 text-white ">
                Search
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="flex-none">
              <button
                className="btn btn-square btn-ghost"
                onClick={handleRegistrationPageAccess}
              >
                <FaPlus size="25" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 ml-8 text-sm breadcrumbs">
        <ul>
          <li>홈</li>
          <li>폐기물 거래/나눔</li>
        </ul>
      </div>

      <div className=" pt-4 px-20 lg:pt-5 pb-4 lg:pb-8 px-36 xl:px-40 xl:container mx-auto 2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto  ">
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
            {posts.content &&
              posts.content
                .filter(
                  wastes =>
                    selectedCategory === '전체' ||
                    wastes.wasteCategory === selectedCategory,
                )
                .map(wastes => (
                  <ProductCard
                    key={wastes.id}
                    wastes={wastes}
                    onDelete={handleDelete}
                  />
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
          disabled={page === posts.totalPages - 1}
          className="join-item btn ml-4"
        >
          다음
        </PaginationButton>
      </div>
    </div>
  );
};

export default ListTest;
