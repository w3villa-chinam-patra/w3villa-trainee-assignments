import { createSlice } from "@reduxjs/toolkit";

const initialState = "en";

export const languageSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLanguage: (_, action) => action.payload,
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
