import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import searchSlice from './searchSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    pageData: productSlice,
    cart: cartSlice,
    searchItem: searchSlice

})

const store = configureStore({
    reducer: rootReducer
})
export default store;