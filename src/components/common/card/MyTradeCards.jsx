import ProductCard from './ProductCard';

const MyTradeCards = ({ product }) => {
  return (
    <div>
      <ProductCard key={product.id} product={product} />
    </div>
  );
};
export default MyTradeCards;
