import { useRecoilState } from "recoil";
import { postsState } from "../recoil/RecoilWastes";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { deletePost } from "../api/WastesApi";
import * as S from "../styles/ProductsListStyle";
import Nav from "../components/Nav";
import { GiHamburgerMenu } from "react-icons/gi";

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
          <GiHamburgerMenu size="25" />
          <Link to="/ProductAdd">
            <FaPlus size="25" />
          </Link>
        </div>

        <div className="nav-bottom">
          <span>관심순</span>
          <span>조회순</span>
          <span>최신순</span>
        </div>
      </S.Nav>

      {posts.map((wastes) => (
        <S.Container key={wastes.id}>
          <div className="product-box">
            <img src="https://placehold.jp/300x300.png" alt="임시이미지" />
            <div>
              <div className=" title">{wastes.title}</div>
              <div className=" content">
                <div className="city">{wastes.address.city}</div>
                <div className="created-at">{wastes.created_at}</div>
              </div>
              <div className=" price">{wastes.waste_price}원</div>
            </div>
          </div>
          <div className="sell-status">{wastes.sell_status}</div>
          <div>{wastes.likes}</div>
          {/* <button onClick={() => handleDelete(wastes.id)}>삭제</button> */}
        </S.Container>
      ))}
    </div>
  );
};
export default ProductsList;
