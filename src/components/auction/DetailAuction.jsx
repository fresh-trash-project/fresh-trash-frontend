import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { deleteProduct, detailProduct } from '../../api/ProductAPI';
import { chatPost } from '../../api/ChattingAPI';
import { LikesState } from '../../recoil/RecoilLikes';
import { globalFileAPI } from '../../../variable';
import DetailCard from '../common/card/DetailCard';
import urlJoin from 'url-join';
const DetailAuction = () => {
  const { wasteId } = useParams(); // URL 파라미터에서 wasteId 가져오기
  const { chatId } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const details = await detailProduct(wasteId);
        setAuctionDetails(details);
      } catch (error) {
        console.error(
          '상품 상세 정보를 불러오는 도중 에러가 발생했습니다:',
          error,
        );
      }
    };
    fetchDetail();
  }, [wasteId]);

  //수정하기 삭제하기 버튼 게시글 등록한 사람만 보이게------------------------
  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const getCurrentUser = () => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const userData = localStorage.getItem('accessToken');

    try {
      const [header, payload, signature] = userData.split('.');

      const decodedPayload = atob(payload);

      const user = JSON.parse(decodedPayload);
      console.log(user);

      return user;
    } catch (error) {
      console.error('사용자 정보를 파싱하는 도중 오류가 발생했습니다:', error);
      return null; // 또는 적절한 기본값 반환
    }
  };
  //삭제--------------------------------
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      // API를 사용하여 제품 삭제
      await deleteProduct(auctionDetails.id);

      navigate('/AuctionList');
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다:', error);
    }
  };

  //이미지 파일 경로-----------------------------
  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };

  return (
    <div>
      <div className="container">
        <div className="flex flex-row-reverse mr-16 mt-4 text-sm breadcrumbs 2xl:ml-8">
          <ul>
            <li>카테고리</li>
            <li>{auctionDetails && auctionDetails.wasteCategory}</li>
          </ul>
        </div>
        <div className="flex flex-row-reverse mt-12">
          <div className="mr-28 dropdown dropdown-end">
            {currentUser &&
              auctionDetails &&
              currentUser.id === auctionDetails.memberResponse.id && (
                <div>
                  <div tabIndex={0} role="button" className="btn m-1">
                    <FiMoreVertical />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <p
                        onClick={() =>
                          handleDelete(auctionDetails && auctionDetails.id)
                        }
                      >
                        삭제하기
                      </p>
                    </li>
                  </ul>
                </div>
              )}
          </div>
        </div>
        <DetailCard
          auctionDetails={auctionDetails}
          wasteId={wasteId}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};
export default DetailAuction;
