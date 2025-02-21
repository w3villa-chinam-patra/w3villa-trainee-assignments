import { createSlice } from "@reduxjs/toolkit";

const initialState = null

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_, action) => action.payload,
        removeUser: () => null
    }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer