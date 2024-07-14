import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
