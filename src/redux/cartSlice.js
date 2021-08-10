import { createSlice } from '@reduxjs/toolkit';
import product from '../components/Product';

const cart = localStorage.getItem('Cart') || '{"products":[] , "totalPrice":0}';
const loadCart = JSON.parse(cart);

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCart,
    reducers: {
        increase: (state, action) => {
            state.products[action.payload].SoLuong += 1;
            state.totalPrice = state.products.reduce((a, b) => a + (b.Gia * b.SoLuong), 0);
            localStorage.setItem('Cart', JSON.stringify(state));
            return state
        },
        decrease: (state, action) => {
            state.products[action.payload].SoLuong -= 1;
            state.totalPrice = state.products.reduce((a, b) => a + (b.Gia * b.SoLuong), 0);
            localStorage.setItem('Cart', JSON.stringify(state));
            return state
        },
        deleteProductInCart: (state, action) => {
            state.products = state.products.filter((product) => product.MSHH !== action.payload);
            state.totalPrice = state.products.reduce((a, b) => a + (b.Gia * b.SoLuong), 0);
            localStorage.setItem('Cart', JSON.stringify(state));
            return state;
        },
        addToCart: (state, action) => {
            if (state.products.find((product) => product.MSHH === action.payload.MSHH)) state.products.find((product) => product.MSHH === action.payload.MSHH).SoLuong += 1;
            else state.products.push(action.payload);
            state.totalPrice = state.products.reduce((a, b) => a + (b.Gia * b.SoLuong), 0);
            localStorage.setItem('Cart', JSON.stringify(state));
            return state;
        },
        clearData: (state, action) => {
            state.products = [];
            state.totalPrice = 0;
            localStorage.setItem('Cart', JSON.stringify(state));
            return state;
        }
    }
})

const { actions, reducer } = cartSlice;
export const { increase, decrease, deleteProductInCart, addToCart, clearData } = actions;
export default reducer;