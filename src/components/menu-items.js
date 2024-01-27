import "./menu-items.css";
import { useState , useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import tunaRoll from '../images/menu/rolls/tuna-roll.jpeg';
import salmonRoll from '../images/menu/rolls/salmon-roll.jpeg';
import yakiRoll from '../images/menu/rolls/yaki-niku-roll.jpeg';
import vegetarianRoll from '../images/menu/rolls/vegetarian-roll.jpeg';
import fantaDrink from '../images/menu/drinks/fanta.jpeg';
import cokeDrink from '../images/menu/drinks/coke.jpeg';
import punchDrink from '../images/menu/drinks/punch.jpeg';
import orangeDrink from '../images/menu/drinks/orange.jpeg';

import cookiesDes from '../images/menu/desserts/cookies.jpeg';
import browniesDes from '../images/menu/desserts/brownies.jpeg';
import churrosDes from '../images/menu/desserts/churros.jpeg';
import iceCreamDes from '../images/menu/desserts/ice-cream.jpeg';
import { set } from "../store/cart"
import OrderApi from "../api/OrderApi";

import Auth from "../components/auth/auth";

function MenuItems() {

  const order = useSelector((state) => state.cart.order)
  const lineItemTally = useSelector((state) => state.cart.lineItemTally)
  

  const dispatch = useDispatch()

  const [displayList, setDisplayList] = useState([]);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    setDisplayList(sushiList)
    console.log("order, ", order)

    setAuth(Auth.getAuth())

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
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayMenu = (menuType) => {
    // console.log("displayMenu, type=", menuType)

    if(menuType==="sushi"){
      console.log("display ", menuType)
      setDisplayList(sushiList)
    }else if(menuType==="drink"){
      console.log("display ", menuType)
      setDisplayList(drinkList)
    }else if(menuType==="dessert"){
      console.log("display ", menuType)
      setDisplayList(dessertList)
    }else{
      console.log("display nothing")
    }
  }

  const addProductToCart = (product) => {

    let newLineItems = order.lineItems.map((i)=>i)

    const index = newLineItems.findIndex((obj,index) => {
      return obj.product.uuid===product.uuid
    });

    let lineItem = {product: product, count: 0}

    if(index===-1){
        lineItem.count = 1;
    }else{
        lineItem = Object.assign({}, newLineItems[index]);
        lineItem.count = ++lineItem.count
    }

    let updatedOrder = {
        userUuid: auth ? auth.uuid : null ,
        uuid:  order.uuid,
        lineItem: lineItem,
        type: "ADD"
    }

    updateOrder(updatedOrder)
    
  }

  const removeProductFromCart  = (product) => {

    let newLineItems =  order.lineItems.map((i)=>i)

    const index = newLineItems.findIndex((obj,index) => {
      return obj.product.uuid===product.uuid
    });

    console.log("index, ", index)

    let lineItem = {product: product, count: 0}

    if(index===-1){
      console.log("couldn't find element to remove")
      return;
    }else{
      lineItem = Object.assign({}, newLineItems[index]);

      if(lineItem.count<=0){
        console.log("nno more element to remove")
        return;
      }

      lineItem.count = --lineItem.count
    }

    let type = ""

    if(lineItem.count===0){
      // remove from order
      type = "REMOVE"
    }else{
      // reduce count but not remove from order
      type = "ADD"
    }

    let updatedOrder = {
        userUuid: auth ? auth.uuid : null ,
        uuid:  order.uuid,
        lineItem: lineItem,
        type: type
    }

    updateOrder(updatedOrder)

  }

  const updateOrder  = (updatedOrder) => {
    console.log("updatedOrder, ", updatedOrder)
    OrderApi.createUpdateOrder(updatedOrder)
    .then((response)=>{
        console.log("response.data, ", response.data)

        let updatedOrder = response.data;

        dispatch(set(updatedOrder))

    })
    .catch((error)=>{
      console.log("error, ", error.data)
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12">
          <h1>Explore Our Menu</h1>
        
          <div className="row">
            <div className="col-12 col-sm-3">
              <ul className="menuBox">
                {menuList.map((item) => (
                  <li className="menuItem" key={item.type}>
                    <button 
                    onClick={()=>displayMenu(item.type)}
                    type="button" 
                    className="btn btn-link menuItemBtn">{item.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-sm-9">
              <div className="row">
                
                  {displayList.map((product)=>(
                    <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-3" key={product.name}>

                      <div className="card menu-item">
                        <img src={product.img} className="card-img-top" alt="Salmon Roll with salmon, avocado, and cream cheese"/>
                        <div className="card-body d-flex flex-column">
                          <div className="mt-auto">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text"><small className="text-muted">{product.calories}</small></p>
                            <p className="card-text">{product.desc}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button onClick={()=>removeProductFromCart(product)} type="button" className="btn btn-outline-secondary btn-sm">-</button>
                                <button type="button" className="btn btn-outline-secondary btn-sm">{lineItemTally[product.uuid] ?? 0}</button>
                                <button onClick={()=>addProductToCart(product)} type="button" className="btn btn-outline-secondary btn-sm">+</button>
                              </div>
                              <button type="button" className="btn btn-primary btn-sm">${product.price.toFixed(2)}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                 
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuItems;

const menuList = [
  {
    type: "sushi",
    name: "Sushi Rolls"
  },
  {
    type: "drink",
    name: "Drinks"
  },
  {
    type: "dessert",
    name: "Desserts"
  }
]

const sushiList = [
  {
    name: "Tuna Roll",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: tunaRoll,
    price: 10,
    uuid: "TUNA_ROLL"
  },
  {
    name: "Salmon Roll",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: salmonRoll,
    price: 12,
    uuid: "SALMON_ROLL"
  },
  {
    name: "Yaki Roll",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: yakiRoll,
    price: 15,
    uuid: "YAKI_ROLL"
  },
  {
    name: "Vegetarian Roll",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: vegetarianRoll,
    price: 15,
    uuid: "VEGETARIAN_ROLL"
  }
]

const drinkList = [
  {
    name: "Fanta",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "fanta",
    img: fantaDrink,
    price: 2,
    uuid: "FANTA"
  },
  {
    name: "Coca Cola",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Coke",
    img: cokeDrink,
    price: 3,
    uuid: "COKE"
  },
  {
    name: "Orange Juice",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Juice",
    img: orangeDrink,
    price: 3,
    uuid: "ORGANCE_JUICE"
  },
  {
    name: "Hawaiian Punch",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Fruit Punch",
    img: punchDrink,
    price: 2,
    uuid: "HAWAIIAN_PUNCH"
  }
]

const dessertList = [
  {
    name: "Cookies",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Cookie",
    img: cookiesDes,
    price: 1.50,
    uuid: "COOKIE"
  },
  {
    name: "Churros",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Churros",
    img: churrosDes,
    price: 2,
    uuid: "CHURRO"
  },
  {
    name: "Brownies",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Brownie",
    img: browniesDes,
    price: 3,
    uuid: "BROWNIE"
  },
  {
    name: "Ice Cream",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Ice cream",
    img: iceCreamDes,
    price: 2,
    uuid: "ICE_CREAM"
  }
]
