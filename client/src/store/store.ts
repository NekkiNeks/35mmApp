import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { accountApi } from "./UsersApi";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
