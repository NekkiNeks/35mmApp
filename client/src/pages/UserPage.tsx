import React, { useCallback, useEffect } from "react";
import useAuth from "../hooks/useAuth";

//redux
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { addUser } from "../store/userSlice";
//custom hooks
import useHttp from "../hooks/useHttp";

export default function UserPage() {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.user);
  const { request } = useHttp();

  const getUserData = useCallback(async () => {
    try {
      const res = await request(`/api/users/account`, "GET", {
        authorization: `Bearer ${token}`,
      });
      if (res.status === "error") throw new Error(res.data.message);
      dispatch(addUser({ user: res.data.user! }));
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }, [dispatch, request, token]);

  const { logout } = useAuth();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  if (user) {
    return (
      <div>
        <img src={user.avatar_url} alt="avatar" />
        <h2>login: {user.login}</h2>
        <p>description: {user.description}</p>
        <p>id: {user.id}</p>
        <button onClick={logout}>logout</button>
      </div>
    );
  }

  return (
    <div>
      <p>userpage without user</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}
