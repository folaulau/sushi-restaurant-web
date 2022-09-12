import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from 'react-redux';
import store from './store/store';
import Home from "./pages/home";
import Menu from "./pages/menu";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import Reservation from "./pages/reservation";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Cart from "./pages/cart";
import Payment from "./pages/payment";

console.log("app env: " + process.env.REACT_APP_ENV);
console.log("api url: " + process.env.REACT_APP_API_URL);
console.log("graphql url: " + process.env.REACT_APP_GRAPHQL_URL);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
