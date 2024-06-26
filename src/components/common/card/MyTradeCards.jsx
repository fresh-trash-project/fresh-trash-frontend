import ProductCard from './ProductCard';

const MyTradeCards = ({ myList }) => {
  console.log('myList', myList);
  return (
    //! 이부분 css 효진 거래내역과 맞추기
    <div className="flex flex-wrap gap-4">
      {myList.map(list => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default MyTradeCards;
