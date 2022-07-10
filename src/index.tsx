import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/home';
import reportWebVitals from './reportWebVitals';

console.log("app env: " + process.env.REACT_APP_ENV);
console.log("api url: " + process.env.REACT_APP_API_URL);
console.log("graphql url: " + process.env.REACT_APP_GRAPHQL_URL);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
