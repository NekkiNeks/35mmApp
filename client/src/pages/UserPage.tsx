import React from "react";
import useAuth from "../hooks/useAuth";

export default function UserPage() {
  const { logout } = useAuth();
  return (
    <div>
      <p>userpage</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}
