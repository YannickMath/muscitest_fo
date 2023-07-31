import { createSlice } from "@reduxjs/toolkit";
// import { ADD_USERNAME_TO_STORE } from "../constant/actionTypes";

const initialState = {
    username: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUsernameToStore: (state, action) => {
            state.username = action.payload;
            console.log("addUsernameToStore action: ", action);
        },
    },
});

export const { addUsernameToStore } = userSlice.actions;
export default userSlice.reducer;