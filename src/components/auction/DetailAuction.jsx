import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAuction, detailAuction } from '../../api/AuctionAPI';
import { chatPost } from '../../api/ChattingAPI';
import { LikesState } from '../../recoil/RecoilLikes';
import { globalFileAPI } from '../../../variable';
import DetailCard from '../common/card/DetailCard';
import urlJoin from 'url-join';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../Constants';
import { CONSOLE } from '../../../Constants';
import Label from '../common/label/Label';
import { useTranslation } from 'react-i18next';
const DetailAuction = () => {
  const { t } = useTranslation();
  const { auctionId } = useParams(); // URL 파라미터에서 auctionId 가져오기
  const { chatId } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const details = await detailAuction(auctionId, navigate);
        setAuctionDetails(details);
        console.log(details);
      } catch (error) {
        console.error(CONSOLE.FETCH_DETAIL_LIST_SUCCESS, error);
      }
    };
    fetchDetail();
  }, [auctionId]);

  // 삭제하기 버튼 게시글 등록한 사람만 보이게------------------------
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
      console.error(CONSOLE.PARSING_ERROR, error);
      return null; // 또는 적절한 기본값 반환
    }
  };
  //삭제--------------------------------
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      // API를 사용하여 제품 삭제
      await deleteAuction(auctionDetails.id, navigate);

      navigate('/AuctionList');
    } catch (error) {
      toast.error(MESSAGES.DELETE_ERROR);
    }
  };

  //이미지 파일 경로-----------------------------
  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };

  return (
    <div>
      <Label
        breadcrumbItems={[
          t('CATEGORY'),
          `${auctionDetails && auctionDetails.productCategory}`,
        ]}
      />
      <div className="container">
        {/* <div className="flex flex-row-reverse mr-16 mt-4 text-sm breadcrumbs 2xl:ml-8">
          <ul>
            <li>카테고리</li>
            <li>{auctionDetails && auctionDetails.productCategory}</li>
          </ul>
        </div> */}
        <div className="flex flex-row-reverse mt-20">
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
                        {t('DELETE')}
                      </p>
                    </li>
                  </ul>
                </div>
              )}
          </div>
        </div>
        <DetailCard auctionDetails={auctionDetails} currentUser={currentUser} />
      </div>
    </div>
  );
};
export default DetailAuction;
