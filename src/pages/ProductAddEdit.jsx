import { useRecoilState } from 'recoil';
import { postsState } from '../recoil/RecoilWastes';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { deletePost } from '../api/WastesApi';
import * as S from '../styles/ProductsListStyle';
import ProductCard from '../components/ProductCard';
// import Nav from '../components/Nav';
import Header from '../components/Home/Header';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
const ITEMS_PER_PAGE = 6;
const MAX_PAGES_DISPLAY = 6;
const ProductsList = () => {
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

  // 전체 페이지 수 계산
  // const totalPages = filteredPosts ? Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) : 0;
  const totalPages = filteredPosts
    ? Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
    : 0;
  // 현재 페이지에 해당하는 제품들을 가져옴
  // const currentProducts = filteredPosts.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE,
  // );
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

  // 페이지를 변경하는 함수
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
      <Header />

      <S.Nav>
        <div className="nav-middle">
          <div className="nav-left">
            {/* <button onClick={toggleModal}> */}
            <button onClick={showModal ? closeModal : openModal}>
              <RxHamburgerMenu size="25" color="white" />
              <p>카테고리</p>
            </button>
          </div>

          <div className="nav-middle-right">
            <div className="search-wrapper">
              <select className="search-category">
                <option value="address">지역</option>
                <option value="title">제목</option>
              </select>
              <input type="text" />
              <IoSearch size="25" className="search-icon" />
            </div>
            <Link to="/ProductAdd">
              <FaPlus size="25" />
            </Link>
          </div>
        </div>
      </S.Nav>
      <S.Category1>
        {showModal && (
          <div className="modal" onClick={closeModal}>
            <ul className="modal-content">
              <li onClick={() => handleCategoryChange('전체')}>전체</li>
              <li onClick={() => handleCategoryChange('전자기기')}>전자기기</li>
              <li onClick={() => handleCategoryChange('의류')}>의류</li>
              <li onClick={() => handleCategoryChange('생활/주방')}>
                생활/주방
              </li>
              <li onClick={() => handleCategoryChange('뷰티')}>뷰티</li>
              <li onClick={() => handleCategoryChange('건강')}>건강</li>
              <li onClick={() => handleCategoryChange('스포츠')}>스포츠</li>
              <li onClick={() => handleCategoryChange('도서')}>도서</li>
              <li onClick={() => handleCategoryChange('장난감/게임')}>
                장난감/게임
              </li>
              <li onClick={() => handleCategoryChange('가구/인테리어')}>
                가구/인테리어
              </li>
              <li onClick={() => handleCategoryChange('반려동물용품')}>
                반려동물용품
              </li>
              <li onClick={() => handleCategoryChange('식물')}>식물</li>
            </ul>
          </div>
        )}
      </S.Category1>

      <S.Header>
        <button onClick={handleSortByViews}>조회순</button>
        <button onClick={handleSortByLikes}>관심순</button>
        <button onClick={handleSortByCreatedAt}>최신순</button>
      </S.Header>

      <S.Card>
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
      </S.Card>
      <S.Pagination className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="previous"
        >
          <GrFormPrevious />
        </button>
        {getPageNumbers().map(pageNumber => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="next"
        >
          <GrFormNext />
        </button>
      </S.Pagination>
    </div>
  );
};
export default ProductsList;
