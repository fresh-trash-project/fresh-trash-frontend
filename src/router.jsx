import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/MyPage";
import EditProfile from "./pages/EditProfile";
import MyTradeList from "./pages/MyTradeList";
import MyAuctionList from "./pages/MyAuctionList";
import MyLikes from "./pages/MyLikes";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import ProductAddEdit from "./pages/ProductAddEdit";
import AuctionList from "./pages/AuctionList";
import AuctionDetail from "./pages/AuctionDetail";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import Pay from "./pages/Pay";

export const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <div>404 Not Found</div> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/MyPage", element: <MyPage /> },
  { path: "/EditProfile", element: <EditProfile /> },
  { path: "/MyTradeList", element: <MyTradeList /> },
  { path: "/MyAuctionList", element: <MyAuctionList /> },
  { path: "/MyLikes", element: <MyLikes /> },
  { path: "/ProductsList", element: <ProductsList /> },
  { path: "/ProductDetail", element: <ProductDetail /> },
  { path: "/ProductAddEdit", element: <ProductAddEdit /> },
  { path: "/AuctionList", element: <AuctionList /> },
  { path: "/AuctionDetail", element: <AuctionDetail /> },
  { path: "/Chat", element: <Chat /> },
  { path: "/ChatList", element: <ChatList /> },
  { path: "/Pay", element: <Pay /> },
]);
