import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "All",
    id: undefined
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (_, action) =>
            action.payload
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer