import React, { useState } from 'react';
import * as S from '../styles/ProductCardStyle';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import { postsState } from '../recoil/RecoilWastes';
import { useEffect } from 'react';
import { fetchPosts } from '../api/WastesApi';
import { updatePost } from '../api/WastesApi';
const ProductCard = ({ post, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(post.id);
  };

  const [posts, setPosts] = useRecoilState(postsState);

  const handleLikeToggle = async () => {
    const updatedPost = { ...post };
    if (updatedPost.hearted) {
      updatedPost.likeCount -= 1; // 채워진 하트에서 빈 하트로 변경되면 likeCount 감소
    } else {
      updatedPost.likeCount += 1; // 빈 하트에서 채워진 하트로 변경되면 likeCount 증가
    }
    updatedPost.hearted = !updatedPost.hearted; // 하트 상태 업데이트
    await updatePost(post.id, updatedPost); // 서버에 업데이트 요청
    const updatedPosts = posts.map(p => (p.id === post.id ? updatedPost : p));
    setPosts(updatedPosts); // Recoil 상태 업데이트
  };
  return (
    <div>
      <S.Container>
        <div className="card">
          <div className="product-box">
            <img src="https://placehold.jp/300x300.png" alt="임시이미지" />
            <div>
              <div className=" title">{post.title}</div>
              <div className=" content">
                <div className="adrress">
                  <div className="state">{post.address.state}</div>
                  <div className="city">{post.address.city}</div>
                </div>
                <div className="day">
                  {/* <LuCalendarDays /> */}
                  {/* <div className="created-at">{wastes.created_at}</div> */}
                </div>
              </div>
              <div className=" price">{post.wastePrice}원</div>
            </div>
          </div>
          <div className="card-bottom">
            <p>{post.sellStatus} </p>
            <div className="like">
              <button onClick={handleLikeToggle}>
                {post.hearted ? (
                  <GoHeartFill size="30" />
                ) : (
                  <GoHeart size="30" />
                )}
              </button>
              <div>{post.likeCount}</div>
            </div>
          </div>
          {/* <button onClick={() => handleDelete(post.id)}>삭제</button> */}
          {/* <button onClick={handleDeleteClick}>삭제</button> */}
        </div>
      </S.Container>
    </div>
  );
};

export default ProductCard;
