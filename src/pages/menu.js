import Header from "../layout/header";
import Footer from "../layout/footer";
import "./menu.css";
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
import { add, remove } from "../store/cart"


function Menu(props) {

  const cartContent = useSelector((state) => state.cart.content)
  const cartContentCount = useSelector((state) => state.cart.contentCount)

  const dispatch = useDispatch()

  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    setDisplayList(sushiList)
    console.log("cartContent, ", cartContent)
    console.log("cartContentCount, ", cartContentCount)
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
    let count = cartContentCount[menuItem.uuid];
    return count ? count : 0;
  }

  const addMenuItemToCart = (menuItem) => {
    
    dispatch(add(menuItem))

  }

  const removeMenuItemFromCart  = (menuItem) => {

    dispatch(remove(menuItem))

  }


  return (
    <>
      {(props.from==='' || props.from==null) && <Header />}
      
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <h1>Explore Our Menu</h1>
            
              <div className="row">
                <div className="col-12 col-md-3">
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
                <div className="col-12 col-md-9">
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
                                <div className="col-4 col-md-4 menuCardPrice">
                                  ${menuItem.price}
                                </div>
                                <div className="col-8 col-md-8 text-center menuCardBtns">
                                  <button onClick={()=>addMenuItemToCart(menuItem)} type="button" className="btn btn-light"><i className="fa fa-plus"></i></button>

                                  <span className="orderCount">{getCartCount(menuItem)}</span>
                                     
                                  <button onClick={()=>removeMenuItemFromCart(menuItem)} type="button" className="btn btn-light"><i className="fa fa-minus"></i></button>
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
    price: 1.5,
    uuid: "COOKIES"
  },
  {
    name: "Churros",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Churros",
    img: churrosDes,
    price: 2,
    uuid: "CHURROS"
  },
  {
    name: "Brownies",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Brownie",
    img: browniesDes,
    price: 3,
    uuid: "BROWNIES"
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
