import Header from "../layout/header";
import Footer from "../layout/footer";
import "./menu.css";
import { useState , useEffect} from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
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
import { useContext } from "react";
import { ShopCartContext } from "../context/shopping-cart";

function Menu(props) {

  const [shopCart, setShopCart] = useState([]);

  // map to keep track of shopping cart item count, it's really expensive to loop
  const [shopCartCount, setShopCartCount] = useState({});

  const [displayList, setDisplayList] = useState([{
    name: "",
    calories: "",
    desc: "",
    img: "",
    price: 0
  }]);

  useEffect(() => {
    setDisplayList(sushiList)
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

  const getCartCount = (menuItem) => {
    // console.log("getCartCount, ", menuItem)
    let count = shopCartCount[menuItem.name];
    return count ? count : 0;
  }

  const addMenuItemToCart = (menuItem) => {
    console.log("addMenuItemToCart, ", menuItem)
    console.log("shopCart, ", shopCart)
    console.log("shopCartCount, ", shopCartCount)
    shopCart.push(menuItem);
    const newShopCart = shopCart.map(obj => obj);
    setShopCart(newShopCart);

    let count = shopCartCount[menuItem.name];

    const newShopCartCount = Object.assign({}, shopCartCount);
    newShopCartCount[menuItem.name] = count ? ++count : 1;
    setShopCartCount(newShopCartCount);
  }

  const removeMenuItemFromCart  = (menuItem) => {
    // console.log("removeMenuItemFromCart, ", menuItem)
    // console.log("shopCart, ", shopCart)
    // console.log("shopCart length, ", shopCart.length)

    if(shopCart.length===0){
      console.log("nothing to remove from cart")
      return;
    }
    
    const indexToRemove = shopCart.findIndex((obj,index) => {
      return obj.name===menuItem.name
    });

    console.log("indexToRemove, ", indexToRemove)

    if(indexToRemove===-1){
      console.log("couldn't find element to remove")
      return;
    }

    shopCart.splice(indexToRemove,1);

    const newShopCart = shopCart.map(obj => obj);
    setShopCart(newShopCart);

    let count = shopCartCount[menuItem.name];

    const newShopCartCount = Object.assign({}, shopCartCount);
    newShopCartCount[menuItem.name] = --count;
    setShopCartCount(newShopCartCount);
  }


  return (
    <>
      <ShopCartContext.Provider value={{content: shopCart, contentCount: shopCartCount}}>
      
      {(props.from==='' || props.from==null) && <Header />}
      
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <h1>Explore Our Menu</h1>
            
              <div className="row">
                <div className="col-3 col-md-3">
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
                <div className="col-9 col-md-9">
                  <div className="row">
                    
                      {displayList.map((menuItem)=>(
                        <div className="col-12 col-md-3" key={menuItem.name}>
                          <div className="card">
                            <div className="card-body">
                              <img
                                src={menuItem.img}
                                alt="First slide"
                                className="menuCardImg"
                              />
                              <div className="row">
                                <div className="col-12 menuCardTitle">
                                  {menuItem.name}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 menuCardCal">
                                  {menuItem.calories}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 menuCardDesc">
                                  {menuItem.desc}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-3 col-md-3 menuCardPrice">
                                  ${menuItem.price}
                                </div>
                                <div className="col-2 col-md-2 menuCardPlus">
                                  <button onClick={()=>addMenuItemToCart(menuItem)} type="button" className="btn btn-light"><i className="fas fa-plus"></i></button>
                                </div>
                                <div className="col-3 col-md-3 menuCardCount">
                                {getCartCount(menuItem)}
                                </div>
                                <div className="col-2 col-md-2 menuCardMinus">
                                  <button onClick={()=>removeMenuItemFromCart(menuItem)} type="button" className="btn btn-light"><i className="fas fa-minus"></i></button>
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
        </div>
      <Footer />
      </ShopCartContext.Provider>
    </>
  );
}

export default Menu;

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
    uuid: ""
  },
  {
    name: "Salmon Roll",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: salmonRoll,
    price: 12,
    uuid: ""
  },
  {
    name: "Yaki Roll",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: yakiRoll,
    price: 15,
    uuid: ""
  },
  {
    name: "Vegetarian Roll",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: vegetarianRoll,
    price: 15,
    uuid: ""
  }
]

const drinkList = [
  {
    name: "Fanta",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "fanta",
    img: fantaDrink,
    price: 2,
    uuid: ""
  },
  {
    name: "Coca Cola",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Coke",
    img: cokeDrink,
    price: 3,
    uuid: ""
  },
  {
    name: "Orange Juice",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Juice",
    img: orangeDrink,
    price: 3,
    uuid: ""
  },
  {
    name: "Hawaiian Punch",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Fruit Punch",
    img: punchDrink,
    price: 2,
    uuid: ""
  }
]

const dessertList = [
  {
    name: "Cookies",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Cookie",
    img: cookiesDes,
    price: 1.5,
    uuid: ""
  },
  {
    name: "Churros",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Churros",
    img: churrosDes,
    price: 2,
    uuid: ""
  },
  {
    name: "Brownies",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Brownie",
    img: browniesDes,
    price: 3,
    uuid: ""
  },
  {
    name: "Ice Cream",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Ice cream",
    img: iceCreamDes,
    price: 2,
    uuid: ""
  }
]
