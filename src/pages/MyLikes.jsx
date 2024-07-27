import { useEffect, useState } from 'react';
import MyTradeCards from '../components/common/card/MyTradeCards';
import { fetchMyLikes } from '../api/UserLikesAPI';
import PaginationButton from '../components/common/pagination/PaginationButton';
import Label from '../components/common/label/Label';
import { useNavigate } from 'react-router-dom';
import CategoryDropDown from '../components/common/category/CategoryDropDown';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../components/common/service/LoadingSpinner';

const MyLikes = () => {
  const { t } = useTranslation();
  const [myLikes, setMyLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const getMyLikes = async () => {
      const dataMyLikes = await fetchMyLikes(selectedCategory, page, navigate);
      setMyLikes(dataMyLikes.content);
      setTotalLikes(dataMyLikes.totalElements);
      setTotalPage(dataMyLikes.totalPages);
      setLoading(false);
    };
    getMyLikes();
  }, [selectedCategory, page]);

  //카테고리--------------------------------
  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setPage(0); // 카테고리가 변경될 때 페이지를 0으로 초기화합니다.
  };

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return (
    <div>
      <div className="navbar flex-row justify-between bg-white shadow-md px-4">
        <CategoryDropDown handleCategoryChange={handleCategoryChange} />
      </div>

      {/* 라벨------------------------------------------------------------------------ */}
      <Label breadcrumbItems={[t('HOME'), t('MY_PAGE'), t('MY_LIKES')]}>
        <div
          role="tab"
          className="tab border-2 scale-110 font-bold bg-green-brunswick text-white"
        >
          {t('LIKES')} ({totalLikes})
        </div>
      </Label>

      <div className=" mt-16 pt-4  lg:pt-5 pb-4 px-20  lg:pb-8 xl:px-40 xl:container  2xl:px-60">
        <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 sm:px-4 xl:px-2 mb-20 xl:container mx-auto  ">
          <MyTradeCards type="product" myList={myLikes} />
        </div>
      </div>

      <div className=" container flex justify-center mb-16">
        <PaginationButton
          // handlePreviousPage={handlePreviousPage}
          // handleNextPage={handleNextPage}
          // number={getPageNumbers}
          setPage={setPage}
          page={page}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};
export default MyLikes;
