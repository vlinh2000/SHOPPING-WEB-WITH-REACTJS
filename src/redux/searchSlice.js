import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: { value: '' },
    reducers: {
        searchItem: (state, action) => {
            return { ...state, value: action.payload }
        }
    }
})

const { actions, reducer } = searchSlice;
export const { searchItem } = actions;
export default reducer;