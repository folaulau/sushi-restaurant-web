import Header from "../layout/header";
import Footer from "../layout/footer";
import { useEffect, useState} from "react";
import "./receipt.css";
import { useSelector, useDispatch } from 'react-redux'
import { removeAll } from "../store/cart"
import OrderApi from "../api/OrderApi";

function Receipt(props) {

  const paymentStatus = new URLSearchParams(window.location.search).get(
    "payment"
  );

  const orderUuid = new URLSearchParams(window.location.search).get(
    "orderUuid"
  );

  const paymentIntentId = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );

  const cartOrder = useSelector((state) => state.cart.order);
  
  console.log("cartOrder, ",cartOrder)

  const [order, setOrder] = useState(cartOrder)

  const [lineItemTally, setLineItemTally] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    console.log("order, ",order)
    console.log("lineItemTally, ",lineItemTally)
    console.log("paymentStatus, ",paymentStatus)

    if(paymentStatus==="success" && order.status==="ORDERING"){

      let payment = {
        paymentIntentId: paymentIntentId,
        uuid: orderUuid
      }

      OrderApi.confirmPayment(payment)
      .then((response)=>{
        let updatedOrder = response.data;

        console.log("order, ", updatedOrder)

        process(updatedOrder)

        dispatch(removeAll())
        
      })
      .catch((error)=>{
          console.log("error, ", error.response.data)
      });

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInterval(() => {
      OrderApi.getOrder(orderUuid)
      .then((response)=>{
        let updatedOrder = response.data;

        console.log("order, ", updatedOrder)

        process(updatedOrder)
      })
      .catch((error)=>{
          console.log("error, ", error.response.data)
      });

    }, 1000 * 30);
  }, [orderUuid, dispatch]);

  const process = (order) => {

    setOrder(order)

    let lineItemTally = {}

    order.lineItems.forEach((li)=>{
        lineItemTally[li.product.uuid] = li.count;
    });

    setLineItemTally(lineItemTally)
  }

  

  return (
    <>
      <Header />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
            
              <div className="row">
                <div className="col-12 col-md-12">
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="row">
                    <div className="col-9 col-md-10">
                      Item
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
                  {order && order.lineItems.map((lineItem) => (
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
                          Qty: {lineItemTally[lineItem.product.uuid]}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <h5 className="text-center">{`$`+lineItem.total}</h5>
                    </div>
                  </div>
                  ))}
                </div>
                <div className="col-12 col-md-4">
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <OrderStatus order={order} />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Receipt;

const OrderStatus  = (props) => {


  return (
    <>
      <div className="row">
          <div className="col-12 col-md-12">
          Total({props.order.lineItems.length} items): ${props.order.lineItemsTotal.toFixed(2)}
          </div>
      </div>
      <div className="row">
          <div className="col-12 col-md-12">
            Service Fee: ${(props.order.stripeFee+props.order.serviceFee).toFixed(2)}
          </div>
      </div>
      <div className="row">
          <div className="col-12 col-md-12">
            Delivery Fee: ${props.order.deliveryFee.toFixed(2)}
          </div>
      </div>
      <div className="row">
          <div className="col-12 col-md-12">
            Tax: ${props.order.taxFee.toFixed(2)}
          </div>
      </div>
      <div className="row mb-3">
          <div className="col-12 col-md-12">
            <strong>Order Total:</strong>${props.order.total.toFixed(2)}
          </div>
      </div>

      { (props.order.payment) &&
        <div className="row mb-3">
          <div className="col-12 col-md-12">
            PaymentMethod: {props.order.payment.paymentMethod.brand} *****  {props.order.payment.paymentMethod.last4} 
          </div>
        </div>
      }
      

      { (props.order.deliveryMethod==="DROP_OFF") &&
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="row">
              <div className="col-12 col-md-12">
                <strong>Delivery Address</strong> 
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
              {props.order.address.street}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
              {props.order.address.city},  {props.order.address.state}  {props.order.address.zipcode}
              </div>
            </div>
          </div>
        </div>

      }

      <hr></hr>

      { (props.order.status==="ORDER_PLACED" || props.order.status==="PREPARING_ORDER") &&
        <div className="row">
          <div className="col-12 col-md-12">
            Your order is being prepared. We appreciate your patience.
          </div>
        </div>
      }
      { (props.order.status==="READY_FOR_PICK_UP") &&
        <div className="row">
          <div className="col-12 col-md-12">
            Your order is ready for pick up. Please come inside.
          </div>
        </div>
      }
      { (props.order.status==="DELIVERING") &&
        <div className="row">
          <div className="col-12 col-md-12">
            Your order is on its way.
          </div>
        </div>
      }
      { (props.order.status==="DELIVERED") &&
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="row">
              <div className="col-12 col-md-12">
                Your order has been dropped off.
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
                Thank you for doing busines with us!
              </div>
            </div>
          </div>
        </div>
      }{ (props.order.status==="PICKED_UP") &&
      <div className="row">
        <div className="col-12 col-md-12">
          <div className="row">
            <div className="col-12 col-md-12">
              Your order has been picked up.
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12">
              Thank you for doing busines with us!
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}