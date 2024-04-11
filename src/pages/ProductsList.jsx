import { useRecoilState } from "recoil";
import { postsState } from "../recoil/RecoilWastes";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { deletePost } from "../api/WastesApi";
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
      <div>
        <Link to="/">FreshTrash</Link>
      </div>
      <Link to="/ProductAdd">
        <p>폐기물 등록</p>
        <FaPlus />
      </Link>
      <div>
        <h2>입력한 내용</h2>
        <ul>
          {posts.map((wastes) => (
            <div key={wastes.id}>
              <div>이미지</div>
              <div>
                <div>{wastes.title}</div>
                <div>{wastes.address.zipcode}</div>
                {/* <div>{wastes.address}</div> */}
                <div>{wastes.waste_price}</div>
                <div>{wastes.sell_status}</div>
              </div>
              <button onClick={() => handleDelete(wastes.id)}>삭제</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProductsList;
