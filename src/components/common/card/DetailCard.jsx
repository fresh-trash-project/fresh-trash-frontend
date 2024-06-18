import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { MdOutlineStar } from 'react-icons/md';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { detailProduct, likeProduct } from '../../../api/ProductAPI';
import { chatPost } from '../../../api/ChattingAPI';
import { LikesState } from '../../../recoil/RecoilLikes';
import { TbCurrencyWon } from 'react-icons/tb';
import { globalFileAPI } from '../../../../variable';
import urlJoin from 'url-join';
const DetailCard = ({
  postDetails,
  auctionDetails,
  currentUser,
  productId,
}) => {
  const data = postDetails || auctionDetails;
  //관심 추가--------------------------------------
  const [likeState, setLikeState] = useRecoilState(LikesState);
  // const [hearted, setHearted] = useState(false);
  const [like, setLike] = useState(false);
  const handleLikeToggle = async () => {
    try {
      // 관심 상태를 토글하고 상태 업데이트
      const newLikeState = !likeState[productId];
      setLikeState({ ...likeState, [productId]: newLikeState });

      // API 호출하여 관심 상태 업데이트
      const response = await likeProduct(
        productId,
        newLikeState ? 'LIKE' : 'UNLIKE',
      );
      console.log('하트상태', response.data);
      setLike(prevDetails => ({
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

  //이미지 파일 경로-----------------------------
  const getImgeUrl = fileName => {
    return urlJoin(globalFileAPI, `${fileName}`);
  };
  const navigate = useNavigate();
  const [chat, setChat] = useState('');
  const handleChat = async () => {
    const chat = await chatPost(data && data.id);
    setChat(chat);
    navigate(`/Chat/${chat && chat.id}/${data && data.id}`);
  };
  return (
    <div>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                src={getImgeUrl(data && data.fileName)}
                alt={data && data.title}
              />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              {currentUser &&
                data &&
                currentUser.id !== data.memberResponse.id && (
                  <div className="flex justify-between">
                    <div>
                      <button
                        className="btn"
                        onClick={() =>
                          document.getElementById('my_modal_1').showModal()
                        }
                      >
                        {data && data.memberResponse.nickname} 프로필
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                          <div className="flex">
                            <img
                              className="rounded-xl mr-16"
                              src="https://placehold.co/200x200"
                              alt=""
                            />
                            {/* <img
                              src={getImgeUrl(
                                postDetails &&
                                  postDetails.memberResponse.fileName,
                              )}
                              alt="이미지"
                            /> */}
                            <div className="flex-row ">
                              <div className="flex items-center">
                                <p className="font-bold text-2xl mr-2 ">
                                  {data && data.memberResponse.nickname}
                                </p>
                                <div className="flex items-center py-4">
                                  <MdOutlineStar color="yellow" size="50" />
                                  <p className="ml-4 text-2xl">
                                    {data && data.memberResponse.rating}
                                  </p>
                                </div>
                              </div>
                              {data &&
                                data.memberResponse &&
                                data.memberResponse.address && (
                                  <div className="flex text-lg">
                                    <p className="mr-2">
                                      {data &&
                                        data.memberResponse.address.state}
                                    </p>
                                    <p>
                                      {data && data.memberResponse.address.city}
                                    </p>
                                  </div>
                                )}
                            </div>
                          </div>

                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                )}

              <hr className="my-6 md:my-8  border-gray-200 dark:border-gray-800" />

              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {data && data.title}
                </h1>
                <div className="bg-white text-yellow-deep font-semibold ml-4 py-2 px-4 border border-yellow-deep rounded">
                  <p>{data && data.productStatus}</p>
                </div>
                <div className="bg-white text-purple-dpurple font-semibold ml-4 py-2 px-4 border border-purple-dpurple rounded">
                  {data && data.auctionStatus}
                </div>
              </div>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex justify-between">
                {postDetails ? (
                  <div className=" flex items-center text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    <TbCurrencyWon />
                    {data && data.productPrice}
                  </div>
                ) : (
                  <div className=" flex items-center text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    <TbCurrencyWon />
                    {data && data.finalBid}
                  </div>
                )}
              </div>

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {data && data.content}
              </p>

              {postDetails ? (
                <div className="flex justify-between">
                  <div className="flex">
                    <p className="mr-3">관심수 {data && data.likeCount} </p>
                    <p>조회수 {data && data.viewCount} </p>
                  </div>
                  <div>작성일 {data && data.createdAt} </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>조회수 {data && data.viewCount} </div>
                  <div>작성일자 - 마감일자 </div>
                </div>
              )}

              <hr className="my-6 md:my-8  border-gray-200 dark:border-gray-800" />
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                {postDetails ? (
                  <div className="flex">
                    <button
                      className="flex items-center justify-center mr-4 py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                      role="button"
                      onClick={() => handleLikeToggle(data && data.id)}
                    >
                      {likeState[productId] ? (
                        <IoHeartSharp className="w-5 h-5 -ms-2 me-2" />
                      ) : (
                        <IoHeartOutline className="w-5 h-5 -ms-2 me-2" />
                      )}
                      <p>관심추가</p>
                    </button>
                    {currentUser &&
                    data &&
                    currentUser.id !== data.memberResponse.id ? (
                      <button
                        className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                        // role="button"
                        onClick={handleChat}
                      >
                        <MdOutlineChatBubbleOutline className="w-5 h-5 -ms-2 me-2" />
                        채팅하기
                      </button>
                    ) : (
                      <Link to="/MyPage/ChatList">
                        <button className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                          <MdOutlineChatBubbleOutline className="w-5 h-5 -ms-2 me-2" />
                          채팅목록
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <Link to="/Pay">
                    <button className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                      입찰참여
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DetailCard;
