import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import AlarmBar from "./components/AlarmBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <MenuBar />
      <AlarmBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
