import Header from "../layout/header";
import Footer from "../layout/footer";
import { useState, useEffect} from "react";
import "./cart.css";
import { useSelector, useDispatch } from 'react-redux'
import ConfirmationModal from "../components/modal/confirmation";
import PaymentModal from "../components/modal/payment";
import { set } from "../store/cart"
import Auth from "../components/auth/auth";
import OrderApi from "../api/OrderApi";

function Cart(props) {

  const orderUuid = useSelector((state) => state.cart.uuid)
  const lineItems = useSelector((state) => state.cart.lineItems)
  const totalItemCount = useSelector((state) => state.cart.totalItemCount)
  const total = useSelector((state) => state.cart.total)
  const lineItemTally = useSelector((state) => state.cart.lineItemTally)

  const dispatch = useDispatch()

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    console.log("lineItems, ",lineItems)
    console.log("lineItemTally, ",lineItemTally)

    if(orderUuid!=null){
      OrderApi.getOrder(orderUuid)
      .then((response)=>{
        let updatedOrder = response.data;

        console.log("order, ", updatedOrder)

        dispatch(set(updatedOrder))
      })
      .catch((error)=>{
          console.log("error, ", error.response.data)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeMenuItemFromCart  = (lineItem) => {
    let auth = Auth.getAuth();
  
    let order = {
      userUuid: auth ? auth.uuid : null ,
      lineItem: lineItem,
      uuid: orderUuid
    }

    console.log("remove order, ", order)
    
    OrderApi.removeItem(order)
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

    const index = lineItems.findIndex((obj,index) => {
      return obj.product.uuid===name
    });

    let lineItem = lineItems[index]

    let updatedLineItem = Object.assign({}, lineItem);
    updatedLineItem.count = value;

    let auth = Auth.getAuth();

    let order = {
      userUuid: auth ? auth.uuid : null ,
      uuid: orderUuid,
      lineItem: updatedLineItem,
      type: "ADD"
    }

    console.log("order, ", order)
    
    OrderApi.createUpdateOrder(order)
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

  const payOrder = () => {
    console.log("payOrder")

    setShowPaymentModal(true)
  }

  const confirmOrder = (message) => {
    console.log("confirmOrder")
  }

  const confirmDeleteAll = (answer) => {
    console.log("confirmDeleteAll, answer, ", answer)

    if(answer==='confirm'){

      let auth = Auth.getAuth();
  
      let order = {
        userUuid: auth ? auth.uuid : null ,
        uuid: orderUuid,
        all: true
      }
  
      console.log("remove all order, ", order)
      
      OrderApi.removeItem(order)
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
                      <button type="button" disabled={(totalItemCount===0)}  className="btn btn-outline-danger btn-sm" onClick={()=>deleteAll()}>delete all</button>
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
                  {lineItems.map((lineItem) => (
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
                      <h5 className="text-center">{`$`+lineItem.total}</h5>
                    </div>
                  </div>
                  ))}
                </div>
                <div className="col-12 col-md-3">
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <DisplayPaymentTab pay={payOrder} content={lineItems} total={total} count={lineItemTally} />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <ConfirmationModal show={showDeleteModal} confirm={confirmDeleteAll} question={`Are you sure you want to remove all items from your cart?`} close={()=>confirmDeleteAll(false)}/>
      <PaymentModal orderUuid={orderUuid} show={showPaymentModal} confirm={confirmOrder} close={()=>setShowPaymentModal(false)} orderList={lineItems} orderCount={lineItemTally} />
      <Footer />
    </>
  );
}

const DisplayPaymentTab  = (props) => {
  let content = props.content;
  let count = props.count;
  let price = 0;

  for(let i=0;i<content.length;i++){
    let menuItem = content[i];
    price += (menuItem.price * count[menuItem.uuid]);
  }

  let btnDisabled = true;

  if(price!==0){
    btnDisabled = false;
  }

  price = price.toFixed(2)
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12">
          Total ({content.length} items): <span className="totalPrice">${props.total}</span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-12">
          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={()=>props.pay()} disabled={btnDisabled} type="button">Pay</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;