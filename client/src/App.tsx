import React from "react";
import { BrowserRouter } from "react-router-dom";
import useRoutes from "./hooks/useRoutes";
import useAuth from "./hooks/useAuth";

//redux
import { useAppDispatch } from "./hooks/reduxHooks";
import { useAppSelector } from "./hooks/reduxHooks";
import { authenticate } from "./store/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const { token, id } = useAppSelector((state) => state.user);
  const { jwtToken, userId } = useAuth();
  if (jwtToken && userId) {
    dispatch(authenticate({ token: jwtToken, id: userId }));
  }
  const isAuthenticated = !!token && !!id;
  const routes = useRoutes(isAuthenticated);
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
