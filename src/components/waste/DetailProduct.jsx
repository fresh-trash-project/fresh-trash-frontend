import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { deleteWaste, detailWaste, likeWaste } from '../../api/WastesApi';
import { chatPost } from '../../api/ChattingAPI';
import { LikesState } from '../../recoil/RecoilLikes';
import { globalFileAPI } from '../../../variable';
import DetailCard from '../common/card/DetailCard';
import urlJoin from 'url-join';
const DetailPrduct = () => {
  const { wasteId } = useParams(); // URL 파라미터에서 wasteId 가져오기
  const { chatId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const details = await detailWaste(wasteId);
        setPostDetails(details);
      } catch (error) {
        console.error(
          '상품 상세 정보를 불러오는 도중 에러가 발생했습니다:',
          error,
        );
      }
    };
    fetchDetail();
  }, [wasteId]);

  //관심 추가--------------------------------------
  const [likeState, setLikeState] = useRecoilState(LikesState);
  // const [hearted, setHearted] = useState(false);
  const [like, setLike] = useState(false);
  const handleLikeToggle = async () => {
    try {
      // 관심 상태를 토글하고 상태 업데이트
      const newLikeState = !likeState[wasteId];
      setLikeState({ ...likeState, [wasteId]: newLikeState });

      // API 호출하여 관심 상태 업데이트
      const response = await likeWaste(
        wasteId,
        newLikeState ? 'LIKE' : 'UNLIKE',
      );
      console.log('하트상태', response.data);
      setPostDetails(prevDetails => ({
        ...prevDetails,
        likeCount: newLikeState
          ? prevDetails.likeCount + 1
          : prevDetails.likeCount - 1,
      }));
    } catch (error) {
      console.error(
        '관심 상태를 업데이트하는 도중 오류가 발생했습니다:',
        error,
      );
    }
  };

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
      await deleteWaste(postDetails.id);

      navigate('/ProductsList');
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다:', error);
    }
  };

  //이미지 파일 경로-----------------------------
  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };

  //채팅------------------------------------

  const [chat, setChat] = useState('');
  const handleChat = async () => {
    const chat = await chatPost(postDetails && postDetails.id);
    setChat(chat);
    navigate(`/Chat/${chat && chat.id}/${postDetails && postDetails.id}`);
  };
  return (
    <div>
      <div className="container">
        <div className="flex flex-row-reverse mr-16 mt-4 text-sm breadcrumbs 2xl:ml-8">
          <ul>
            <li>카테고리</li>
            <li>{postDetails && postDetails.wasteCategory}</li>
          </ul>
        </div>
        <div className="flex flex-row-reverse mt-12">
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
                        <p>수정하기</p>
                      </Link>
                    </li>
                    <li>
                      <p
                        onClick={() =>
                          handleDelete(postDetails && postDetails.id)
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
          postDetails={postDetails}
          wasteId={wasteId}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};
export default DetailPrduct;
