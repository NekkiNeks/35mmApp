import { Routes, Route, Navigate } from "react-router-dom";

//pages
import AuthPage from "../pages/AuthPage";
import UserPage from "../pages/UserPage";
import RegisterPage from "../pages/RegisterPage";

export default function useRoutes(isAuthenticated: boolean) {
  if (isAuthenticated) {
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
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}
