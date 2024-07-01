import ProductCard from './ProductCard';

const MyTradeCards = ({ myList, type }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  justify-center">
      {myList.map(item => (
        <ProductCard
          key={item.id}
          product={type === 'product' ? item : undefined}
          auction={type === 'auction' ? item : undefined}
        />
      ))}
    </div>
  );
};
export default MyTradeCards;
