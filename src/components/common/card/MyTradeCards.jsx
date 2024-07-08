import ProductCard from './ProductCard';
import ReviewButton from '../button/ReviewButton';
const MyTradeCards = ({ myList, type }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  justify-center">
      {myList.map(item => (
        <div key={item.id}>
          <ProductCard
            key={item.id}
            product={type === 'product' ? item : undefined}
            auction={type === 'auction' ? item : undefined}
          />

          {type === 'auction' ? <ReviewButton id={item.id} /> : <div></div>}
        </div>
      ))}
    </div>
  );
};
export default MyTradeCards;
