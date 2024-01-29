import { createSlice } from '@reduxjs/toolkit'
import Storage from './storage';

const storeName = "cart"

// backend call
var cart = Storage.getJson(storeName)

console.log("cart, ", cart)

let order = (cart && cart.uuid) ? cart : {uuid: null, status:null, payment:{paymentMethodBrand: "", paymentMethodLast4:""}, address:{}, lineItems:[], total:0, lineitemsTotal:0, totalItemCount:0 }

console.log("order, ", order)

export const cartSlice = createSlice({
  name: storeName,
  initialState: {
    order: order,
    lineItemTally: {}
  },
  reducers: {
    set: (state, action) => {
        
        if(action.payload === null || action.payload === undefined || action.payload === 'undefined'){

          state.order = order

          Storage.setJson(storeName, state.order);

        }else{

          state.order = action.payload;

          state.lineItemTally = {}

          let totalItemCount = 0

          state.order.lineItems.forEach((li) => {
              state.lineItemTally[li.product.uuid] = li.count;
              totalItemCount += li.count
          });

          state.order.totalItemCount = totalItemCount

          Storage.setJson(storeName, state.order);

        }

        

        console.log("set new cart", state.order)
    },
    removeAll: (state, action) => {
        state.order = {};
        state.lineItemTally = {}

        Storage.setJson(storeName, {});
        Storage.setJson("paymentIntent", {});

        console.log("remove all")
    }
  },
})

// Action creators are generated for each case reducer function
export const { set, add, remove, removeAll, changeQuantity } = cartSlice.actions

export default cartSlice.reducer