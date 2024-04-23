import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchPosts } from '../../api/WastesApi';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { signInState } from '../../recoil/RecoilSignIn';
import Pagination from '../common/pagination/Pagination';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
const ITEMS_PER_PAGE = 6;
const List = () => {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useRecoilState(signInState);
  const handleRegistrationPageAccess = () => {
    if (!signIn) {
      alert('로그인한 회원만 등록 페이지에 접근할 수 있습니다.');
    } else {
      navigate('/ProductAdd');
    }
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error(
          '게시물 목록을 불러오는 도중 에러가 발생했습니다:',
          error,
        );
      }
    };

    fetchData();
  }, []);

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
      : posts.filter(post => post.wasteCategory === selectedCategory);

  const totalPages = filteredPosts
    ? Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
    : 0;

  const currentProducts = filteredPosts
    ? filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      )
    : [];

  //페이지를 변경하는 함수
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // 카테고리를 변경하는 함수
  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setCurrentPage(1); // 페이지를 첫 페이지로 초기화
  };

  //정렬-----------------------------------------------------------
  const [sortedByViews, setSorted] = useState(false);
  //정렬
  const handleSortByViews = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      // 조회수가 많은 순서대로 정렬
      return b.viewCount - a.viewCount;
    });
    setPosts(sortedPosts);
    setSorted(true);
  };
  const handleSortByLikes = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return b.likeCount - a.likeCount;
    });
    setPosts(sortedPosts);
    setSorted(true);
  };
  const handleSortByCreatedAt = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.id) - new Date(a.id);
    });
    setPosts(sortedPosts);
    setSorted(true);
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
            <button onClick={handleSortByViews} className="mr-5">
              조회순
            </button>
            <button onClick={handleSortByLikes} className="mr-5">
              관심순
            </button>
            <button onClick={handleSortByCreatedAt}>최신순</button>
          </div>
          <div className="grid gap-6 justify-items-center md:grid-cols-2  lg:grid-cols-3 item_ list ">
            {currentProducts
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default List;
