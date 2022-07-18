import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import type User from "../../../@types/User";

interface iState {
  token: string | null;
  userId: string | null;
}

const initialState: iState = {
  token: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (
      state,
      action: PayloadAction<{ token: string; userId: string }>
    ) => {
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.token = null;
      state.token = null;
    },
  },
});

export const { authUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
