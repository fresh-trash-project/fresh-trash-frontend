import ProductCard from '../waste/ProductCard';

const MyTradeCards = ({ myList }) => {
  console.log(myList);

  return (
    <div className=" pt-4 px-20 lg:pt-5 pb-4 lg:pb-8 lg:px-36 xl:px-40 xl:container mx-auto 2xl:px-60 ">
      <div className=" pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <div className="grid gap-6 justify-items-center md:grid-cols-2  lg:grid-cols-3 item_ list ">
          {myList.map(wastes => (
            <ProductCard key={wastes.id} wastes={wastes} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyTradeCards;
