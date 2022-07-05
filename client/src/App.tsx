import React from "react";
import { BrowserRouter } from "react-router-dom";
import useRoutes from "./hooks/useRoutes";

//redux
import { useAppSelector } from "./hooks/reduxHooks";

function App() {
  const { token } = useAppSelector((state) => state.user);
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
