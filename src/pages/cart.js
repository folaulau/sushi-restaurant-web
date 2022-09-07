import Header from "../layout/header";
import Footer from "../layout/footer";
import { useState, useEffect} from "react";
import "./cart.css";
import { useSelector, useDispatch } from 'react-redux'
import { changeQuantity , removeAll} from "../store/cart"
import ConfirmationModal from "../components/modal/confirmation";

function Cart(props) {

  const cartContent = useSelector((state) => state.cart.content)
  const cartContentCount = useSelector((state) => state.cart.contentCount)

  const dispatch = useDispatch()

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    console.log("cartContentCount, ",cartContentCount)
    console.log("cartContent, ",cartContent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeMenuItemFromCart  = (menuItem) => {
  }

  const changeQty = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("name, ",name)
    console.log("value, ",value)
    let payload = { uuid: name, count: value}
    dispatch(changeQuantity(payload))
  }

  const deleteAll = () => {
    console.log("deleteAll")
    setShowDeleteModal(true)
  }

  const confirmDeleteAll = (answer) => {
    console.log("confirmDeleteAll, answer, ", answer)

    if(answer==='confirm'){
      dispatch(removeAll())
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
                      <button type="button"  className="btn btn-outline-danger btn-sm" onClick={()=>deleteAll()}>delete all</button>
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
                  {cartContent.map((menuItem) => (
                  <div key={menuItem.uuid} className="row mb-3">
                    <div className="col-12 col-md-3">
                      <img
                        src={menuItem.img}
                        alt="First slide"
                        className="cartItemImg"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <span className="itemTitle">{menuItem.name},</span><span className="itemPrice">${menuItem.price}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-12">
                          {menuItem.desc}
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-4 col-md-2">
                          <select className="form-select small-input" name={menuItem.uuid} value={cartContentCount[menuItem.uuid]} onChange={changeQty}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="col-4 col-md-2">
                          <button type="button"  className="btn btn-outline-danger btn-sm" onClick={()=>removeMenuItemFromCart(menuItem)}>delete</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <h5 className="text-center"><DisplayPrice price={menuItem.price} count={cartContentCount[menuItem.uuid]}/></h5>
                    </div>
                  </div>
                  ))}
                </div>
                <div className="col-12 col-md-3">
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <DisplayPaymentTab content={cartContent} count={cartContentCount} />
                      
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

const DisplayPrice  = (props) => {
  let price = (props.price * props.count).toFixed(2);
  return "$"+price;
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
          Total ({content.length} items): <span className="totalPrice">${price}</span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-12">
          <div className="d-grid gap-2">
            <button className="btn btn-primary" disabled={btnDisabled} type="button">Pay</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;