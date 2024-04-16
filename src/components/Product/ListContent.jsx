import { useRecoilState } from 'recoil';
import { postsState } from '../../recoil/RecoilWastes';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { deletePost } from '../../api/WastesApi';
import ProductCard from './ProductCard';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
const ITEMS_PER_PAGE = 6;
const MAX_PAGES_DISPLAY = 6;
const ListContent = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  console.log(posts);

  const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  //카테고리 별 검색
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
  };

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

  const [currentPage, setCurrentPage] = useState(1);

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
  const getPageNumbers = () => {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(MAX_PAGES_DISPLAY / 2),
    );
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAY - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => index + startPage,
    );
  };

  //페이지를 변경하는 함수
  const handlePageChange = page => {
    setCurrentPage(page);
  };

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
            <RxHamburgerMenu size="25" />
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
              <Link to="/ProductAdd">
                <div className="btn btn-square btn-ghost">
                  <FaPlus size="25" />
                </div>
              </Link>
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
                  post={wastes}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="join flex justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="join-item btn"
        >
          <GrFormPrevious />
        </button>
        {getPageNumbers().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className="join-item btn"
          >
            {pageNumber}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="join-item btn"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};
export default ListContent;
