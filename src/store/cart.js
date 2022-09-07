import { createSlice } from '@reduxjs/toolkit'
import Storage from './storage';
import Calculator from '../utils/calculator';

const storeName = "cart"

var cart = Storage.get(storeName)

let cartContent = cart['content'] ? cart['content'] : []
let contentCount = cart['count'] ? cart['count'] : {}
let totalCount = cart['totalCount'] ? cart['totalCount'] : 0

export const cartSlice = createSlice({
  name: storeName,
  initialState: {
    content: cartContent,
    contentCount: contentCount,
    totalCount: totalCount
  },
  reducers: {
    setNewCart: (state, action) => {
      let payload = action.payload;
      state.content = payload.content;
      state.contentCount = payload.contentCount;
    },
    add: (state, action) => {
        let menuItem = action.payload;

        const index = state.content.findIndex((obj,index) => {
            return obj.uuid===menuItem.uuid
        });
      
        if(index===-1){
            state.content.push(menuItem);
        }

        console.log("menuItem, ",menuItem)

        let count = state.contentCount[menuItem.uuid];
        state.contentCount[menuItem.uuid] = count ? ++count : 1;

        state.totalCount = Calculator.calculateCartTotalItemCount(state.contentCount);

        cart['content'] = state.content
        cart['count'] = state.contentCount
        cart['totalCount'] = state.totalCount

        Storage.set(storeName, cart);

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
      
        let count = state.contentCount[menuItem.uuid];
        state.contentCount[menuItem.uuid] = --count;

        state.totalCount = Calculator.calculateCartTotalItemCount(state.contentCount);

        cart['content'] = state.content
        cart['count'] = state.contentCount
        cart['totalCount'] = state.totalCount

        Storage.set(storeName, cart);
    },
    removeAll: (state, action) => {
        state.content = [];
        state.contentCount = {};
        state.totalCount = 0;

        state.totalCount = 0;

        cart['content'] = state.content
        cart['count'] = state.contentCount
        cart['totalCount'] = state.totalCount

        Storage.set(storeName, cart);
    },
    changeQuantity: (state, action) => {
        let payload = action.payload;
        state.contentCount[payload.uuid] = payload.count;

        state.totalCount = Calculator.calculateCartTotalItemCount(state.contentCount);

        cart['count'] = state.contentCount
        cart['totalCount'] = state.totalCount

        Storage.set(storeName, cart);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNewCart, add, remove, removeAll, changeQuantity } = cartSlice.actions

export default cartSlice.reducer