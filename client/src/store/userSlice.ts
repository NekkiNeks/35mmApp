import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iState {
  id: string | null;
  token: string | null;
}

const initialState: iState = {
  id: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<{ token: string; id: string }>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.id = null;
      state.token = null;
    },
  },
});

export const { authUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
