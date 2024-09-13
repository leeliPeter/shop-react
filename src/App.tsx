import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { checkUserStatus } from "./Redux/userInfoSlice";
import { fetchProducts } from "./Redux/productSlice"; // Import the fetchProducts thunk
import { fetchHomeImages } from "./Redux/homeImageSlice"; // Import the fetchHomeImages thunk
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
import ForgotPwd from "./component/forgotPwd/ForgotPwd";
import ResetPwd from "./component/resetPassword/ResetPwd";
import Payment from "./component/payment/Payment";
import Loading from "./component/loading/Loading";
import "./font3/iconfont.css";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state) => state.products);
  const homeImagesState = useAppSelector((state) => state.homeImages); // Get the home images state
  const location = useLocation();

  useEffect(() => {
    // Check user status on component mount
    const checkStatus = async () => {
      await checkUserStatus(dispatch);
    };

    checkStatus();
  }, [dispatch]);

  useEffect(() => {
    // Fetch products and home images on component mount
    dispatch(fetchHomeImages());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Determine if the current route is "/reset-password"
  const isResetPwdRoute = location.pathname === "/reset-password";

  // Check if either products or home images are loading
  if (productsState.loading || homeImagesState.loading) {
    return (
      <>
        {!isResetPwdRoute && <User />}
        {!isResetPwdRoute && <Header />}
        <Loading />
        {!isResetPwdRoute && <Footer />}
        {!isResetPwdRoute && <PhoneNav />}
      </>
    );
  }

  return (
    <>
      {!isResetPwdRoute && <User />}
      {!isResetPwdRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category/:position?" element={<Products />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/forgot-pwd" element={<ForgotPwd />} />
        <Route path="/reset-password" element={<ResetPwd />} />
        <Route path="/payment/:orderId" element={<Payment />} />
      </Routes>
      {!isResetPwdRoute && <Footer />}
      {!isResetPwdRoute && <PhoneNav />}
    </>
  );
}

export default App;
