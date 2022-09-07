import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function CartIcon() {

  const totalCount = useSelector((state) => state.cart.totalCount)

  return (
    <Link to="/cart" className="me-3 py-2 text-dark text-decoration-none">
        <i className="fa fa-shopping-cart"></i>
        {(totalCount>0) && 
            <span>({totalCount})</span>
        }
    </Link>
  );
}

export default CartIcon;
