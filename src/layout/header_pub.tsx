import React from "react";
import logo from "../images/logo.png";
import { useState , useEffect} from "react";
import { useContext } from "react";
import { ShopCartContext } from "../context/shopping-cart";


function PublicHeader() {

  const [displayList, setDisplayList] = useState([{
    name: "",
    calories: "",
    desc: "",
    img: "",
    price: 0
  }]);

  // const {content} = useContext(ShopCartContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ShopCartContext.Consumer>
    {({content}) => (
    <header className="container mt-3">
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img src={logo} alt="logo" />
          <span className="fs-4">Sushi</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a className="me-3 py-2 text-dark text-decoration-none" href="/menu">
            Menu
          </a>
          <a
            className="me-3 py-2 text-dark text-decoration-none"
            href="/reservation"
          >
            Reservation
          </a>
          <a
            className="me-3 py-2 text-dark text-decoration-none"
            href="/signup"
          >
            Sign Up
          </a>
          <a
            className="me-3 py-2 text-dark text-decoration-none"
            href="/signin"
          >
            Sign In
          </a>
          <a
            className="me-3 py-2 text-dark text-decoration-none"
            href="/cart"
          >
            <i className="fa fa-shopping-cart"></i> 
            {(content.length>0) && 
              <span>({content.length})</span>
            }
          </a>
        </nav>
      </div>
    </header>
    )}
    </ShopCartContext.Consumer>
  );
}

export default PublicHeader;
