import { Routes, Route, Navigate } from "react-router-dom";

//pages
import AuthPage from "../pages/AuthPage";
import UserPage from "../pages/UserPage";

export default function useRoutes(isAuth: boolean) {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/account" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/account" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}
