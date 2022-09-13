import Header from "../layout/header";
import Footer from "../layout/footer";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import { useSelector, useDispatch } from 'react-redux'
import ConfirmationModal from "../components/modal/confirmation";
import { set } from "../store/cart"
import Auth from "../components/auth/auth";
import OrderApi from "../api/OrderApi";

function Cart(props) {

  const order = useSelector((state) => state.cart.order)
  const lineItemTally = useSelector((state) => state.cart.lineItemTally)

  const dispatch = useDispatch()

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    console.log("order, ",order)

    if(order.uuid!=null){
      OrderApi.getOrder(order.uuid)
      .then((response)=>{
        let updatedOrder = response.data;

        console.log("order, ", updatedOrder)

        dispatch(set(updatedOrder))
      })
      .catch((error)=>{
          console.log("error, ", error.response.data)
      });
    }

    setAuth(Auth.getAuth())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeMenuItemFromCart  = (lineItem) => {

    let updatedOrder = {
      userUuid: auth ? auth.uuid : null ,
      lineItem: lineItem,
      uuid: order.uuid
    }
    
    OrderApi.removeItem(updatedOrder)
    .then((response)=>{
      console.log("response.data, ", response.data)

        let updatedOrder = response.data;

        dispatch(set(updatedOrder))

    })
    .catch((error)=>{
        console.log("error, ", error)
    });
  }

  const changeQty = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("name, ",name)
    console.log("value, ",value)

    const index = order.lineItems.findIndex((obj,index) => {
      return obj.product.uuid===name
    });

    let lineItem =  order.lineItems[index]

    let updatedLineItem = Object.assign({}, lineItem);
    updatedLineItem.count = value;

    let auth = Auth.getAuth();

    let updatedOrder = {
      userUuid: auth ? auth.uuid : null ,
      uuid: order.uuid,
      lineItem: updatedLineItem,
      type: "ADD"
    }

    console.log("updatedOrder, ", updatedOrder)
    
    OrderApi.createUpdateOrder(updatedOrder)
    .then((response)=>{
      console.log("response.data, ", response.data)

        let updatedOrder = response.data;

        dispatch(set(updatedOrder))

    })
    .catch((error)=>{
        console.log("error, ", error)
    });
  }

  const deleteAll = () => {
    console.log("deleteAll")
    setShowDeleteModal(true)
  }

  const confirmDeleteAll = (answer) => {
    console.log("confirmDeleteAll, answer, ", answer)

    if(answer==='confirm'){
  
      let updatedOrder = {
        userUuid: auth ? auth.uuid : null ,
        uuid: order.uuid,
        all: true
      }
  
      console.log("remove all order, ", updatedOrder)
      
      OrderApi.removeItem(updatedOrder)
      .then((response)=>{
        console.log("response.data, ", response.data)
  
          let updatedOrder = response.data;
  
          dispatch(set(updatedOrder))
  
      })
      .catch((error)=>{
          console.log("error, ", error)
      });
    }

    setShowDeleteModal(false)
  }




  return (
    <>
      <Header />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <h1>Cart</h1>
            
              <div className="row">
                <div className="col-12 col-md-12">
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-9">
                  <div className="row">
                    <div className="col-9 col-md-10">
                      <button type="button" disabled={(order.totalItemCount===0)}  className="btn btn-outline-danger btn-sm" onClick={()=>deleteAll()}>delete all</button>
                    </div>
                    <div className="col-3 col-md-2">
                      Price
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <hr></hr>
                    </div>
                  </div>
                  {order.lineItems.map((lineItem) => (
                  <div key={lineItem.product.uuid} className="row mb-3">
                    <div className="col-12 col-md-3">
                      <img
                        src={lineItem.product.imageUrl}
                        alt="First slide"
                        className="cartItemImg"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <span className="itemTitle">{lineItem.product.title},</span><span className="itemPrice">${lineItem.product.price}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-12">
                          {lineItem.product.description}
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-4 col-md-2">
                          <select className="form-select small-input" name={lineItem.product.uuid} value={lineItemTally[lineItem.product.uuid]} onChange={changeQty}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="col-4 col-md-2">
                          <button type="button"  className="btn btn-outline-danger btn-sm" onClick={()=>removeMenuItemFromCart(lineItem)}>delete</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <h5 className="text-center">{`$`+(lineItem.total).toFixed(2)}</h5>
                    </div>
                  </div>
                  ))}
                </div>
                <div className="col-12 col-md-3">
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <DisplayPaymentTab order={order} count={lineItemTally} />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <ConfirmationModal show={showDeleteModal} confirm={confirmDeleteAll} question={`Are you sure you want to remove all items from your cart?`} close={()=>confirmDeleteAll(false)}/>
      <Footer />
    </>
  );
}

const DisplayPaymentTab  = (props) => {

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12">
          Total ({props.order.totalItemCount} items): <span className="totalPrice">${props.order.lineItemsTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-12">
          <div className="d-grid gap-2">
            <Link to="/payment" className="btn btn-primary" disabled={(props.order.lineItemsTotal===0)}>
            Pay
            </Link>
            {/* <button className="btn btn-primary" onClick={()=>props.pay()} disabled={btnDisabled} type="button">Pay</button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;