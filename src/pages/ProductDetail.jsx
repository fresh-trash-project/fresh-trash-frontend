import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { postsState } from '../recoil/RecoilWastes';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { MdOutlineStar } from 'react-icons/md';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { updatePost } from '../api/WastesApi';
import { UserInfo } from '../api/UserAPI';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useRecoilState(postsState);
  // const ProductsList = useRecoilValue(postsState);
  const wastes = posts.find(wastes => wastes.id === parseInt(id));
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserInfo();
        setUserInfo(data); // 가져온 데이터를 상태에 설정
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Nav />

      <div className="container">
        <div className=" mt-4  text-sm breadcrumbs 2xl:ml-8">
          <ul>
            <li>카테고리</li>
            <li>{wastes.wasteCategory}</li>
          </ul>
        </div>
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img
                  className="w-full dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                  alt=""
                />
                <img
                  className="w-full hidden dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                  alt=""
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <div className="flex justify-between">
                  <div>
                    {userInfo.map(post => (
                      <div key={post.id}>
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById('my_modal_1').showModal()
                          }
                        >
                          {post.nickname} 프로필
                        </button>
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box">
                            <div className="flex">
                              <img
                                className="rounded-xl mr-16"
                                src="https://placehold.co/200x200"
                                alt=""
                              />
                              <div className="flex-row ">
                                <div className="flex items-center">
                                  <p className="font-bold text-2xl mr-2 ">
                                    {post.nickname}
                                  </p>
                                  <div className="flex items-center py-4">
                                    <MdOutlineStar color="yellow" size="50" />
                                    <p className="ml-4 text-2xl">
                                      {post.rating}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex text-lg">
                                  <p className="mr-2">{post.address.state}</p>
                                  <p>{post.address.city}</p>
                                </div>
                              </div>
                            </div>

                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="my-6 md:my-8  border-gray-200 dark:border-gray-800" />

                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {wastes.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex justify-between">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    \ {wastes.wastePrice}
                  </p>
                </div>

                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {wastes.content}
                </p>
                <div className="flex">
                  <p className="mr-3">관심수 {wastes.likeCount}</p>
                  <p>조회수 {wastes.viewCount}</p>
                </div>
                <hr className="my-6 md:my-8  border-gray-200 dark:border-gray-800" />
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    className="flex items-center justify-center py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    role="button"
                  >
                    <IoHeartOutline className="w-5 h-5 -ms-2 me-2" />
                    관심추가
                  </button>
                  <button
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    role="button"
                  >
                    <MdOutlineChatBubbleOutline className="w-5 h-5 -ms-2 me-2" />
                    채팅하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div>img</div>
        <div>판매자정보</div>
        <div>
          <div>
            <div>카테고리</div>
            <div>관심수</div>
            <div>조회수</div>
          </div>
          <div>제목</div>
          <div>가격/나눔</div>
          <div>내용</div>
        </div>
        <div>
          <div>하트</div>
          <div>채팅하기</div>
        </div> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default ProductDetail;
