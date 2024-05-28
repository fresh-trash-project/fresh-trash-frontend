import ProductCard from './ProductCard';

const MyTradeCards = ({ myList }) => {
  return (
    <div>
      <ProductCard key={myList.id} wastes={myList} />
    </div>
  );
};
export default MyTradeCards;
