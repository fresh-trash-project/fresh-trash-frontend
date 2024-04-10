import { useRecoilState } from "recoil";
import { postsState } from "../recoil/RecoilWastes";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ProductsList = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  console.log(posts);

  return (
    <div>
      <Link to="/ProductAdd">
        <div>
          <Link to="/">FreshTrash</Link>
        </div>
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
              {/* <button onClick={() => handleDelete(wastes.id)}>삭제</button> */}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProductsList;
