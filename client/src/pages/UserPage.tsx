import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

//redux
import { useAppSelector } from "../hooks/reduxHooks";

//custom hooks
import useHttp from "../hooks/useHttp";

//types
import type User from "../../../@types/User";

export default function UserPage() {
  const { logout } = useAuth();

  return (
    <div>
      <p>userpage without user</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}
