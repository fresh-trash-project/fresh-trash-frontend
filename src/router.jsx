import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
import SignUpSignIn from './pages/SignUpSignIn';
import MyPage from './pages/MyPage.jsx';
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
import NotFound404 from './pages/NotFound404.jsx';
import ErrorElement from './components/common/service/ErrorElement.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      { path: '', element: <Home /> },
      { path: 'SignUpSignIn', element: <SignUpSignIn /> },
      { path: 'MyPage', element: <MyPage /> },
      { path: 'MyPage/MyTradeList', element: <MyTradeList /> },
      { path: 'MyPage/MyAuctionList', element: <MyAuctionList /> },
      { path: 'MyPage/MyLikes', element: <MyLikes /> },
      { path: 'ProductsList', element: <ProductsList /> },
      { path: 'ProductDetail/:productId', element: <ProductDetail /> },
      { path: 'ProductAdd', element: <ProductAdd /> },
      { path: 'ProductEdit/:productId', element: <ProductEdit /> },
      { path: 'AuctionList', element: <AuctionList /> },
      { path: 'AuctionDetail/:auctionId', element: <AuctionDetail /> },
      { path: 'Chat/:chatId/:wasteId', element: <Chat /> },
      { path: 'MyPage/ChatList', element: <ChatList /> },
      { path: 'Pay/:auctionId', element: <Pay /> },
    ],
  },
  { path: '*', element: <NotFound404 /> },
]);
// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
//   { path: '/SignUpSignIn', element: <SignUpSignIn /> },
//   { path: '/MyPage', element: <MyPage /> },
//   { path: 'MyPage/MyTradeList', element: <MyTradeList /> },
//   { path: 'MyPage/MyAuctionList', element: <MyAuctionList /> },
//   { path: 'MyPage/MyLikes', element: <MyLikes /> },
//   { path: '/ProductsList', element: <ProductsList /> },
//   { path: '/ProductDetail/:productId', element: <ProductDetail /> },
//   { path: '/ProductAdd', element: <ProductAdd /> },
//   { path: '/ProductEdit/:productId', element: <ProductEdit /> },
//   { path: '/AuctionList', element: <AuctionList /> },
//   { path: '/AuctionDetail/:auctionId', element: <AuctionDetail /> },
//   { path: '/Chat/:chatId/:wasteId', element: <Chat /> },
//   { path: 'MyPage/ChatList', element: <ChatList /> },
//   { path: '/Pay/:auctionId', element: <Pay /> },
//   { path: '*', element: <NotFound404 /> }, // 404 페이지를 처리하는 경로 추가
// ]);
