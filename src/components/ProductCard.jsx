import React from "react";
import * as S from "../styles/ProductCardStyle";
import { useRecoilState } from "recoil";
import { postsState } from "../recoil/RecoilWastes";
import { LuCalendarDays } from "react-icons/lu";
import { GoHeart } from "react-icons/go";

const ProductCard = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  return (
    <S.Container>
      {posts.map((wastes) => (
        <div key={wastes.id} className="card">
          <div className="product-box">
            <img src="https://placehold.jp/300x300.png" alt="임시이미지" />
            <div>
              <div className=" title">{wastes.title}</div>
              <div className=" content">
                <div className="adrress">
                  <div className="state">{wastes.address.state}</div>
                  <div className="city">{wastes.address.city}</div>
                </div>
                <div className="day">
                  <LuCalendarDays />
                  <div className="created-at">{wastes.created_at}</div>
                </div>
              </div>
              <div className=" price">{wastes.waste_price}원</div>
            </div>
          </div>
          <div className="card-bottom">
            <p>{wastes.sell_status} </p>
            <GoHeart size="40" />
          </div>
          <div>{wastes.likes}</div>

          {/* <button onClick={() => handleDelete(wastes.id)}>삭제</button> */}
        </div>
      ))}
    </S.Container>
  );
};

export default ProductCard;
