import { createSlice } from '@reduxjs/toolkit'
import Storage from './storage';
import Calculator from '../utils/calculator';
import OrderApi from '../api/OrderApi';

const storeName = "cart"

// backend call
var cart = Storage.getJson(storeName)

let lineItems = cart['lineItems'] ? cart['lineItems'] : []
let totalItemCount = cart['totalItemCount'] ? cart['totalItemCount'] : 0
let uuid = cart['uuid'] ? cart['uuid'] : null
let total = cart['total'] ? cart['total'] : 0
let lineItemTally = cart['lineItemTally'] ? cart['lineItemTally'] : {}

export const cartSlice = createSlice({
  name: storeName,
  initialState: {
    uuid: uuid,
    lineItems: lineItems,
    totalItemCount: totalItemCount,
    total: total,
    lineItemTally: lineItemTally
  },
  reducers: {
    set: (state, action) => {
        let order = action.payload;

        cart['lineItems'] = state.lineItems = order.lineItems;
        cart['uuid'] = state.uuid = order.uuid;
        cart['totalItemCount'] = state.totalItemCount = order.totalItemCount;
        cart['total'] = state.total = order.total;

        state.lineItemTally = {}

        order.lineItems.forEach((li)=>{
            state.lineItemTally[li.product.uuid] = li.count;
        });

        Storage.setJson(storeName, order);

        console.log("set new cart", state.lineItems)
    },
    add: (state, action) => {
        let product = action.payload;

        const index = state.lineItems.findIndex((obj,index) => {
            return obj.product.uuid===product.uuid
        });
      
        let lineItem = {product: product, count: 0}

        if(index===-1){
            lineItem.count = 1;
            state.lineItems.push(lineItem);
        }else{
            lineItem = state.lineItems[index]
            lineItem.count = ++lineItem.count
            state.lineItems[index] = lineItem
        }

        console.log("lineItem, ",lineItem)

        

        let order = {
            uuid: state.uuid,
            lineItems: state.lineItems
        }
        
        OrderApi.createUpdateOrder(order)
        .then((response)=>{
            console.log("response, ", response)

            let updatedOrder = response.data;
            state.lineItems = updatedOrder.lineItems;
            state.uuid = updatedOrder.uuid;
            state.totalItemCount = updatedOrder.totalItemCount;
            state.total = updatedOrder.total;

            Storage.setJson(storeName, updatedOrder);
        })
        .catch((error)=>{
            console.log("error, ", error)
        });

        
    },
    remove: (state, action) => {
        let menuItem = action.payload;
        
        if(state.content.length===0){
            console.log("nothing to remove from cart")
            return;
        }
          
        const indexToRemove = state.content.findIndex((obj,index) => {
            return obj.uuid===menuItem.uuid
        });
      
        if(indexToRemove===-1){
            console.log("couldn't find element to remove")
            return;
        }
      
        state.content.splice(indexToRemove,1);
      
        state.contentCount[menuItem.uuid] = 0;

        state.totalCount = Calculator.calculateCartTotalItemCount(state.contentCount);

        cart['content'] = state.content
        cart['count'] = state.contentCount
        cart['totalCount'] = state.totalCount

        Storage.setJson(storeName, cart);
    },
    removeAll: (state, action) => {
        cart['lineItems'] = state.lineItems = []
        cart['uuid'] = state.uuid = null;
        cart['totalItemCount'] = state.totalItemCount = 0;
        cart['total'] = state.total = 0;
        cart['lineItemTally'] = state.lineItemTally = {};

        Storage.setJson(storeName, {});
        Storage.setJson("paymentIntent", {});

        console.log("remove all")
    },
    changeQuantity: (state, action) => {
        let payload = action.payload;
        state.contentCount[payload.uuid] = payload.count;

        state.totalCount = Calculator.calculateCartTotalItemCount(state.contentCount);

        cart['content'] = state.content
        cart['count'] = state.contentCount
        cart['totalCount'] = state.totalCount

        Storage.setJson(storeName, cart);
    },
  },
})

// Action creators are generated for each case reducer function
export const { set, add, remove, removeAll, changeQuantity } = cartSlice.actions

export default cartSlice.reducer