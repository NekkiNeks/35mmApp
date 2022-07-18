import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//types
import type { RootState } from "./store";

interface iPhoto {
  _id: string;
  name: string;
  camera: string;
  film: string;
}

interface iResponce {
  status: "success" | "error";
  data: {
    user: {
      login: string;
      _id: string;
      photos: iPhoto[];
    };
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery,
  endpoints: (builder) => ({
    getAccountData: builder.query<iResponce, string>({
      query: (str) => "account",
    }),
  }),
});

export const { useGetAccountDataQuery } = accountApi;
