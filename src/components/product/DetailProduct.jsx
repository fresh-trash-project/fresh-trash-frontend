import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteProduct,
  detailProduct,
  likeProduct,
} from '../../api/ProductAPI';
import { LikesState } from '../../recoil/RecoilLikes';
import { globalFileAPI } from '../../../variable';
import DetailCard from '../common/card/DetailCard';
import urlJoin from 'url-join';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../Constants';
import { CONSOLE } from '../../../Constants';
import Label from '../common/label/Label';
import { useTranslation } from 'react-i18next';
const DetailProduct = () => {
  const { t } = useTranslation();
  const { productId } = useParams(); // URL 파라미터에서 productId 가져오기
  console.log('아이디' + productId);
  const { chatId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const details = await detailProduct(productId, navigate);
        setPostDetails(details);
      } catch (error) {
        console.error(CONSOLE.FETCH_DETAIL_LIST_SUCCESS, error);
      }
    };
    fetchDetail();
  }, [productId]);

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
      console.error(CONSOLE.PARSING_ERROR, error);
      return null; // 또는 적절한 기본값 반환
    }
  };
  //삭제--------------------------------
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      // API를 사용하여 제품 삭제
      await deleteProduct(postDetails.id, navigate);

      navigate('/ProductsList');
    } catch (error) {
      toast.error(MESSAGES.DELETE_ERROR);
      console.log(error);
    }
  };

  //이미지 파일 경로-----------------------------
  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };

  //채팅------------------------------------

  return (
    <div>
      <Label
        breadcrumbItems={[
          t('CATEGORY'),
          `${postDetails && postDetails.productCategory}`,
        ]}
      />
      <div className="container">
        <div className="flex flex-row-reverse mt-20">
          <div className="mr-28 dropdown dropdown-end">
            {currentUser &&
              postDetails &&
              currentUser.id === postDetails.memberResponse.id && (
                <div>
                  <div tabIndex={0} role="button" className="btn m-1">
                    <FiMoreVertical />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to={`/ProductEdit/${postDetails.id}`}>
                        <p>{t('EDIT')}</p>
                      </Link>
                    </li>
                    <li>
                      <p
                        onClick={() =>
                          handleDelete(postDetails && postDetails.id)
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
        <DetailCard
          postDetails={postDetails}
          productId={productId}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};
export default DetailProduct;
