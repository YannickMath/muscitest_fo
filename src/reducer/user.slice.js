import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsernameToStore: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { addUsernameToStore } = userSlice.actions;
export default userSlice.reducer;
