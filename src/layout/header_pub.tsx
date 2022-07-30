import React from 'react';
import logo from '../images/logo.png';

function PublicHeader() {
  return (
    <header className='container mt-3'>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
          <img src={logo} alt="logo" />
          <span className="fs-4">Sushi</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a className="me-3 py-2 text-dark text-decoration-none" href="/order">Order</a>
          <a className="me-3 py-2 text-dark text-decoration-none" href="/">Enterprise</a>
          <a className="me-3 py-2 text-dark text-decoration-none" href="/">Support</a>
          <a className="me-3 py-2 text-dark text-decoration-none" href="/signup">Sign Up</a>
          <a className="me-3 py-2 text-dark text-decoration-none" href="/signin">Sign In</a>
        </nav>
      </div>
    </header>
  );
}

export default PublicHeader;
