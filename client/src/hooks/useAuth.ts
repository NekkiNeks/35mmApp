import { useCallback, useEffect } from "react";
import { authUser, logoutUser } from "../store/userSlice";
import { useAppDispatch } from "./reduxHooks";

export default function useAuth() {
  const dispatch = useAppDispatch();

  const login = useCallback(
    (token: string, id: string) => {
      dispatch(authUser({ id, token }));
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", id);
    },
    [dispatch]
  );

  const logout = () => {
    dispatch(logoutUser());

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

  return { login, logout };
}
