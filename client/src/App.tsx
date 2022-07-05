import React from "react";
import { BrowserRouter } from "react-router-dom";
import useRoutes from "./hooks/useRoutes";

//redux
import { useAppSelector } from "./hooks/reduxHooks";

function App() {
  const { token, id } = useAppSelector((state) => state.user);
  const isAuthenticated = !!token && !!id;
  const routes = useRoutes(isAuthenticated);
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
