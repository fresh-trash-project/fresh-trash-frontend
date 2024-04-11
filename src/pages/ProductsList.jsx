import { useRecoilState } from "recoil";
import { postsState } from "../recoil/RecoilWastes";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { deletePost } from "../api/WastesApi";
import * as S from "../styles/ProductsListStyle";
import Nav from "../components/Nav";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { IoSearch } from "react-icons/io5";
const ProductsList = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  console.log(posts);
  const handleDelete = async (postId) => {
    try {
      // API를 사용하여 제품 삭제
      await deletePost(postId);
      // 상태에서 해당 제품을 제거합니다.
      setPosts(posts.filter((wastes) => wastes.id !== postId));
      console.log("제품이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("제품 삭제 중 오류가 발생했습니다:", error);
    }
  };
  return (
    <div>
      <Nav />
      <S.Nav>
        <div className="nav-middle">
          <div>
            <GiHamburgerMenu size="25" />
            <div>
              <span>전체</span>
              <span>의류</span>
              <span>가전</span>
            </div>
          </div>

          <div className="nav-middle-right">
            <div className="search-wrapper">
              <select className="search-category">
                <option>카테고리</option>
                <option>지역</option>
                <option>제목</option>
              </select>
              <input type="text" />
              <IoSearch size="25" className="search-icon" />
            </div>
            <Link to="/ProductAdd">
              <FaPlus size="25" />
            </Link>
          </div>
        </div>

        <div className="nav-bottom">
          <span>관심순</span>
          <span>조회순</span>
          <span>최신순</span>
        </div>
      </S.Nav>

      <S.CardList>
        <ProductCard />
      </S.CardList>
    </div>
  );
};
export default ProductsList;
