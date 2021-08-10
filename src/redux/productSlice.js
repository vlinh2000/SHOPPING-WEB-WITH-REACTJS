import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'pageData',
    initialState: { page: 1, limit: 8 },
    reducers: {
        changePage: (state, action) => {
            return { ...state, page: action.payload }
        }
    }
})

const { actions, reducer } = productSlice;
export const { changePage } = actions;
export default reducer;