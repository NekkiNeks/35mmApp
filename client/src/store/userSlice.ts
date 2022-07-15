import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type User from "../../../@types/User";

interface iState {
  token: string | null;
  user: User | null;
}

const initialState: iState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.token = null;
    },
    addUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { authUser, logoutUser, addUser } = userSlice.actions; 

export default userSlice.reducer;
