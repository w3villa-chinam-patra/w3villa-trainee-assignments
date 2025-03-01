import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (_, action) => action.payload,
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
