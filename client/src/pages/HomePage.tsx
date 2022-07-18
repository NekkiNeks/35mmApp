import React from "react";
import useAuth from "../hooks/useAuth";
import { useGetAccountDataQuery } from "../store/UsersApi";

export default function UserPage() {
  const { logout } = useAuth();
  const { data, isLoading, isError } = useGetAccountDataQuery("");

  console.log(data, isLoading, isError);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (data) {
    return (
      <div>
        <h1>{data.data.user.login}</h1>
        <p>_id: {data.data.user._id}</p>
        <button onClick={logout}>logout</button>
        <br />
        {data.data.user.photos.map((photo) => {
          return (
            <img
              src={`/uploads/${photo.name}`}
              alt="pic"
              style={{ width: "50%" }}
            />
          );
        })}
      </div>
    );
  } else {
    return <div>no user</div>;
  }
}
