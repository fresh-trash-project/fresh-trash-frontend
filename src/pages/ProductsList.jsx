import MenuBar from '../try/components/MenuBar';
// import ListContent from '../components/waste/ListContent';
import Footer from '../components/Home/Footer';
import Nav from '../components/Home/Nav';
import List from '../components/waste/List';
const ProductsList = () => {
  return (
    <div>
      <Nav />
      {/* <ListContent /> */}
      <List />
      <Footer />
    </div>
  );
};
export default ProductsList;
