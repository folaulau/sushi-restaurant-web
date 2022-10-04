import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import Auth from '../components/auth/auth';
import "./header.css";
import { Link } from "react-router-dom";
import CartIcon from "../components/cart-icon";
import BackendAPI from '../api/Backend';
import BackendServerStatus from '../components/backend-server-status';

function Header() {

  const [auth, setAuth] = useState({uuid:""});

  useEffect(() => {

    checkBackendService();

    let auth = Auth.getAuth();
    setAuth(auth)
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const checkBackendService = () => {
    
    BackendAPI.getBackendStatus()
    .then(response => {
      console.log("response, ", response)
    }).catch((error)=>{
      console.log("error, ", error)
    });

  }

  const signOut = () => {
    
    Auth.signOut();

    window.location.href = "/";

  }


  if(!auth){
    return (
      <PublicHeader/>
    );
  }else{
    return (
      <>
        <header className="container mt-3">

          <BackendServerStatus/>

          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              <img src={logo} alt="logo" />
              <span className="fs-4">Sushi</span>
            </a>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

              <Link to="/menu" className="me-3 py-2 text-dark text-decoration-none">Menu</Link>
              
              <Link to="/reservation" className="me-3 py-2 text-dark text-decoration-none">Reservation</Link>

              <CartIcon />

              <button type='button' className="nav-link dropdown-toggle" id="acctNavbarDropdown" data-bs-toggle={`dropdown`} aria-expanded={false}>
                <i className="fa fa-user fa-8x"></i>
              </button>
              <ul className="dropdown-menu" aria-labelledby="acctNavbarDropdown">
                <li><Link to="/account" className="dropdown-item">Account</Link></li>
                <li><Link to="/payment-method" className="dropdown-item">Payment Method</Link></li>
                <li><Link to="/orders" className="dropdown-item">Orders</Link></li>
                <li><Link to="/reservations" className="dropdown-item">Reservations</Link></li>
                <li><hr></hr></li>
                <li>
                  <div className="d-grid gap-2">
                    <button onClick={()=>signOut()} id="signOutBtn" className="btn btn-default" type="button">Sign Out</button>
                  </div>
                </li>
                
              </ul>

              {/* <Dropdown as={ButtonGroup} id="acct-dropdown">
                <Dropdown.Toggle split variant="default">
                  <button className='btn btn-default' id="acct-dropdown-btn"> <i className="fa fa-user fa-8x"></i></button>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/account">Account</Dropdown.Item>
                  <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                  <Dropdown.Item href="/paymentmethod">Payment Method</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
      

            </nav>
          </div>
        </header>
      </>
    );
  }
  
  
}

export default Header;

function PublicHeader() {

  return (
    <header className="container mt-3">
      
      <BackendServerStatus/>
      
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img src={logo} alt="logo" />
          <span className="fs-4">Sushi</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

          <Link to="/menu" className="me-3 py-2 text-dark text-decoration-none">Menu</Link>
          
          <Link to="/reservation" className="me-3 py-2 text-dark text-decoration-none">Reservation</Link>

          <Link to="/signup" className="me-3 py-2 text-dark text-decoration-none">Sign Up</Link>

          <Link to="/signin" className="me-3 py-2 text-dark text-decoration-none">Sign In</Link>

          <CartIcon />

        </nav>
      </div>
    </header>
  );
}