import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const global = createSlice({
  name: "boy",
  initialState,
  reducers: {
    createUser: (state, { payload }) => {
      state.user = payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { createUser, signOut } = global.actions;

export default global.reducer;
