import { useCallback, useEffect, useState } from "react";

export default function useAuth() {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((token: string, id: string) => {
    setJwtToken(token);
    setUserId(id);

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userId", id);
  }, []);

  const logout = () => {
    setJwtToken(null);
    setUserId(null);

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const id = localStorage.getItem("userId");

    if (id && token) {
      login(token, id);
    }
  }, [login]);

  return { login, logout, jwtToken, userId };
}
