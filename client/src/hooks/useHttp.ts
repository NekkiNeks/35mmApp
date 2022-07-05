import { useState } from "react";
import type User from "../../../@types/User";

interface iResponce {
  status: "success" | "error";
  data: {
    message?: string;
    jwt?: string;
    userId?: string;
    user?: User;
  };
}

export default function useHttp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function request(
    url: string,
    method: string,
    headers?: { authorization?: string },
    body?: { login?: string; password?: string } | null
  ): Promise<iResponce> {
    setLoading(true);
    let res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
    const data: iResponce = await res.json();
    setLoading(false);
    return data;
  }

  return { loading, error, request, setError };
}
