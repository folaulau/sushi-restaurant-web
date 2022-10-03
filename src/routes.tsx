import React from "react";
import { useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Menu from "./pages/menu";
import Reservation from "./pages/reservation";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Cart from "./pages/cart";
import Payment from "./pages/payment";
import Receipt from "./pages/receipt";
import ReservationDetails from "./pages/reservation-details";
import Profile from './pages/orders';
import Account from './pages/account';
import Auth from "./components/auth/auth";

function AppRoutes() {

  const [auth, setAuth] = useState({})

  useEffect(() => {
    setAuth(Auth.getAuth());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="reservation/details" element={<ReservationDetails />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="receipt" element={<Receipt />} />

          {/* private routes */}
          {
            auth && 
            <Route path="account">
              <Route path="" element={<Account />} />
              <Route path="orders" element={<Profile />} />
            </Route>
          }
          
          <Route path="*" element={<p>Page not found: 404!</p>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
