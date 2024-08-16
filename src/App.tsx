import User from "./component/user/user";
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import Products from "./component/products/Products";
import Detail from "./component/detail/Detail";
import Login from "./component/login/Login";
import Profile from "./component/profile/Profile";
import CheckOut from "./component/check-out/Check-out";
import Footer from "./component/footer/Footer";
import PhoneNav from "./component/phone-nav/Phone-nav";
import "./font3/iconfont.css";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <User />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category/:position?" element={<Products />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/check-out" element={<CheckOut />} />
      </Routes>

      <Footer />
      <PhoneNav />
    </>
  );
}

export default App;
