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

function Menu() {

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

  const displayMenu = (menuType: string) => {
    console.log("displayMenu, type=", menuType)

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


  return (
    <>
      <Header />
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
                    
                      {displayList.map((roll)=>(
                        <div className="col-12 col-md-3" key={roll.name}>
                          <div className="card">
                            <div className="card-body">
                              <img
                                src={roll.img}
                                alt="First slide"
                                className="menuCardImg"
                              />
                              <div className="row">
                                <div className="col-12 menuCardTitle">
                                  {roll.name}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 menuCardCal">
                                  {roll.calories}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 menuCardDesc">
                                  {roll.desc}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-3 col-md-3 menuCardPrice">
                                  ${roll.price}
                                </div>
                                <div className="col-2 col-md-2 menuCardPlus">
                                  <button type="button" className="btn btn-light"><i className="fas fa-plus"></i></button>
                                </div>
                                <div className="col-3 col-md-3 menuCardCount">
                                2
                                </div>
                                <div className="col-2 col-md-2 menuCardMinus">
                                  <button type="button" className="btn btn-light"><i className="fas fa-minus"></i></button>
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
    price: 10
  },
  {
    name: "Salmon Roll",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: salmonRoll,
    price: 12
  },
  {
    name: "Yaki Roll",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: yakiRoll,
    price: 15
  },
  {
    name: "Vegetarian Roll",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Crunchy rice, tuna tartare, negi, aonori",
    img: vegetarianRoll,
    price: 15
  }
]

const drinkList = [
  {
    name: "Fanta",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "fanta",
    img: fantaDrink,
    price: 2
  },
  {
    name: "Coca Cola",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Coke",
    img: cokeDrink,
    price: 3
  },
  {
    name: "Orange Juice",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Juice",
    img: orangeDrink,
    price: 3
  },
  {
    name: "Hawaiian Punch",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Fruit Punch",
    img: punchDrink,
    price: 2
  }
]

const dessertList = [
  {
    name: "Cookies",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Cookie",
    img: cookiesDes,
    price: 1.5
  },
  {
    name: "Churros",
    calories: "240 g | 8 pieces | 420 kcal",
    desc: "Churros",
    img: churrosDes,
    price: 2
  },
  {
    name: "Brownies",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Brownie",
    img: browniesDes,
    price: 3
  },
  {
    name: "Ice Cream",
    calories: "200 g | 6 pieces | 360 kcal",
    desc: "Ice cream",
    img: iceCreamDes,
    price: 2
  }
]
