import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/MyPage";
import MyTradeList from "./pages/MyTradeList";
import MyAuctionList from "./pages/MyAuctionList";
import MyLikes from "./pages/MyLikes";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import ProductAdd from "./pages/ProductAdd.jsx";
import ProductEdit from "./pages/ProductEdit.jsx";
import AuctionList from "./pages/AuctionList";
import AuctionDetail from "./pages/AuctionDetail";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import Pay from "./pages/Pay";

export const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <div>404 Not Found</div> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/MyPage", element: <MyPage /> },
  { path: "/MyTradeList", element: <MyTradeList /> },
  { path: "/MyAuctionList", element: <MyAuctionList /> },
  { path: "/MyLikes", element: <MyLikes /> },
  { path: "/ProductsList", element: <ProductsList /> },
  { path: "/ProductDetail", element: <ProductDetail /> },
  { path: "/ProductAdd", element: <ProductAdd /> },
  { path: "/ProductEdit", element: <ProductEdit /> },
  { path: "/AuctionList", element: <AuctionList /> },
  { path: "/AuctionDetail", element: <AuctionDetail /> },
  { path: "/Chat", element: <Chat /> },
  { path: "/ChatList", element: <ChatList /> },
  { path: "/Pay", element: <Pay /> },
]);
