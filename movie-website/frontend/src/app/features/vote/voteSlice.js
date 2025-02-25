import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    setVote: (_, action) => action.payload,
  },
});

export const { setVote } = voteSlice.actions;
export default voteSlice.reducer;
