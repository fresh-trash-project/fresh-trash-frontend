import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
import SignUpSignIn from './pages/SignUpSignIn';

import MyPage from './pages/MyPage';
import MyTradeList from './pages/MyTradeList';
import MyAuctionList from './pages/MyAuctionList';
import MyLikes from './pages/MyLikes';
import ProductsList from './pages/ProductsList';
import ProductDetail from './pages/ProductDetail';
import ProductAdd from './pages/ProductAdd.jsx';
import ProductEdit from './pages/ProductEdit.jsx';
import AuctionList from './pages/AuctionList';
import AuctionDetail from './pages/AuctionDetail';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import Pay from './pages/Pay';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: ({ error }) => {
      if (error.status === 404) {
        return <div>404 Not Found 페이지를 표시할 수 없습니다. </div>;
      } else if (error.status === 400) {
        return (
          <div>400 Bad Request 이미 존재하는 이메일 또는 닉네임 입니다.</div>
        );
      } else {
        return <div>Unexpected Error</div>;
      }
    },
  },
  // { path: "/SignUp", element: <SignUp /> },
  // { path: "/SignIn", element: <SignIn /> },
  { path: '/SignUpSignIn', element: <SignUpSignIn /> },
  { path: '/MyPage', element: <MyPage /> },
  { path: '/MyTradeList', element: <MyTradeList /> },
  { path: '/MyAuctionList', element: <MyAuctionList /> },
  { path: '/MyLikes', element: <MyLikes /> },
  { path: '/ProductsList', element: <ProductsList /> },
  { path: '/ProductDetail', element: <ProductDetail /> },
  { path: '/ProductAdd', element: <ProductAdd /> },
  { path: '/ProductEdit', element: <ProductEdit /> },
  { path: '/AuctionList', element: <AuctionList /> },
  { path: '/AuctionDetail', element: <AuctionDetail /> },
  { path: '/Chat', element: <Chat /> },
  { path: '/ChatList', element: <ChatList /> },
  { path: '/Pay', element: <Pay /> },
]);
