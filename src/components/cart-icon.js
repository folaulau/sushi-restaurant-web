import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function CartIcon() {

  const order = useSelector((state) => state.cart.order)

  return (
    <Link to="/cart" className="me-3 py-2 text-dark text-decoration-none">
        <i className="fa fa-shopping-cart fa-8x"></i>
        {(order.totalItemCount>0) && 
            <span>({order.totalItemCount})</span>
        }
    </Link>
  );
}

export default CartIcon;
