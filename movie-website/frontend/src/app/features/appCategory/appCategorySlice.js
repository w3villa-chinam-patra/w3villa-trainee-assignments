import { createSlice } from "@reduxjs/toolkit";
import { MOVIE_CATEGORY } from "../../../appCategory";

const initialState = MOVIE_CATEGORY

const appCategory = createSlice({
    name: "appCategory",
    initialState,
    reducers: {
        setCategory: (_, action) =>
            action.payload
    }
})

export const {setCategory} = appCategory.actions
export default appCategory.reducer