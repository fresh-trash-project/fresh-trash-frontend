import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';
import { postsState } from '../../recoil/RecoilWastes';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { MdOutlineStar } from 'react-icons/md';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { FiMoreVertical } from 'react-icons/fi';
import { fetchPosts, deletePost } from '../../api/WastesApi';
import { fetchUserNames } from '../../api/UserNameAPI';
import { Link, useNavigate } from 'react-router-dom';

const DetailCard = () => {
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
  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, [setPosts]);
  const navigate = useNavigate();
  const handleDelete = async wasteId => {
    try {
      // API를 사용하여 제품 삭제
      await deletePost(wasteId);
      // 상태에서 해당 제품을 제거합니다.
      setPosts(posts.filter(wastes => wastes.id !== wasteId));
      console.log('제품이 성공적으로 삭제되었습니다.');
      navigate('/ProductsList');
    } catch (error) {
      console.error('제품 삭제 중 오류가 발생했습니다:', error);
    }
  };
  const location = useLocation();
  // const editData = location.state.id;
  // console.log('EditData', editData);

  return (
    <div>
      <div className="container">
        <div className="flex justify-between mt-16">
          <div className=" mt-4  text-sm breadcrumbs 2xl:ml-8">
            <ul>
              <li>카테고리</li>
              <li>{wastes.wasteCategory}</li>
            </ul>
          </div>
          {/*나중에 이 버튼은 등록한 유저만 보이도록 처리 */}
          <div className="mr-8 dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <FiMoreVertical />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={`/ProductEdit/${wastes.id}`}>
                  <p>수정하기</p>
                </Link>
              </li>
              <li>
                <p onClick={() => handleDelete(wastes.id)}>삭제하기</p>
              </li>
            </ul>
          </div>
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
                                  <p className="mr-2">{wastes.address.state}</p>
                                  <p>{wastes.address.city}</p>
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
                <div className="flex justify-between">
                  <div className="flex">
                    <p className="mr-3">관심수 {wastes.likeCount}</p>
                    <p>조회수 {wastes.viewCount}</p>
                  </div>
                  <div>작성일 : {wastes.created_at}</div>
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
                  <Link to="/Chat">
                    <div
                      className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                      role="button"
                    >
                      <MdOutlineChatBubbleOutline className="w-5 h-5 -ms-2 me-2" />
                      채팅하기
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DetailCard;
