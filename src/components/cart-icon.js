import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function CartIcon() {

  const totalItemCount = useSelector((state) => state.cart.totalItemCount)

  return (
    <Link to="/cart" className="me-3 py-2 text-dark text-decoration-none">
        <i className="fa fa-shopping-cart fa-8x"></i>
        {(totalItemCount>0) && 
            <span>({totalItemCount})</span>
        }
    </Link>
  );
}

export default CartIcon;
