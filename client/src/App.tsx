import React from "react";
import { BrowserRouter } from "react-router-dom";
import useRoutes from "./hooks/useRoutes";

//redux
import { useAppDispatch } from "./hooks/reduxHooks";
import { useAppSelector } from "./hooks/reduxHooks";
import { authUser } from "./store/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const { token, id } = useAppSelector((state) => state.user);
  if (token && id) {
    dispatch(authUser({ token, id }));
  }
  const isAuthenticated = !!token && !!id;
  const routes = useRoutes(isAuthenticated);
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
