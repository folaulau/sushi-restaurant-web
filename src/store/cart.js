import { createSlice } from '@reduxjs/toolkit'
import Storage from './storage';

const storeName = "cart"

// backend call
var cart = Storage.getJson(storeName)

let order = cart.uuid ? cart : {uuid: null, status:null, payment:{paymentMethod:{brand:"", last4:""}}, address:{}, lineItems:[], total:0, lineItemsTotal:0 }

export const cartSlice = createSlice({
  name: storeName,
  initialState: {
    order: order,
    lineItemTally: {}
  },
  reducers: {
    set: (state, action) => {
        state.order = action.payload;

        state.lineItemTally = {}

        state.order.lineItems.forEach((li)=>{
            state.lineItemTally[li.product.uuid] = li.count;
        });

        Storage.setJson(storeName, state.order);

        console.log("set new cart", state.order.lineItems)
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