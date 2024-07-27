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

/*
App 컴포넌트에서는 Outlet을 사용하여 하위 라우트가 렌더링되도록 합니다. 
*/
