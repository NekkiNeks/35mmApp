import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

//redux
import { useAppSelector } from "../hooks/reduxHooks";

//custom hooks
import useHttp from "../hooks/useHttp";

//types
import type User from "../../../@types/User";

export default function UserPage() {
  const { id, token } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<User | null | undefined>(null);
  const { request } = useHttp();

  async function getUserData() {
    try {
      const res = await request(`/api/users/${id}`, "GET", {
        authorization: `Bearer ${token}`,
      });
      if (res.status === "error") throw new Error(res.data.message);
      setUser(res.data.user);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  const { logout } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);

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
