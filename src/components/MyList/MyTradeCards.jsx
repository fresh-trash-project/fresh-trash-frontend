import { useRecoilState } from 'recoil';
import ProductCard from '../waste/ProductCard';
import { postsState } from '../../recoil/RecoilWastes';
import { fetchMySellList } from '../../api/UserTradeAPI';
import { useEffect } from 'react';
// import { postcss } from 'tailwindcss';
// import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

const MyTradeCards = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  // console.log(posts);

  // useEffect(() => {
  //   const getMySellList = async () => {
  //     try {
  //       const dataSellList = await fetchMySellList();
  //       console.log(dataSellList);
  //       setPosts(dataSellList);
  //       console.log(posts);
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };
  //   getMySellList();
  // }, []);

  return (
    <div className=" pt-4 px-20 lg:pt-5 pb-4 lg:pb-8 lg:px-36 xl:px-40 xl:container mx-auto 2xl:px-60 ">
      <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <div className="grid gap-6 justify-items-center md:grid-cols-2  lg:grid-cols-3 item_ list ">
          {/* {posts.map(wastes => (
            <ProductCard key={wastes.id} wastes={wastes} />
          ))} */}{' '}
          ddd
        </div>
      </div>
    </div>
  );
};
export default MyTradeCards;
