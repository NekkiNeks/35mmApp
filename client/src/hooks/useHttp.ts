import { useState } from "react";

interface iResponce {
  userId: string;
  jwt: string;
}

export default function useHttp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function request(
    url: string,
    method: string,
    body: { login: string; password: string }
  ): Promise<iResponce | undefined> {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.status === "error") throw new Error(data.data.message);
      setLoading(false);
      return data.data;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        setLoading(false);
      }
    }
  }

  return { loading, error, request, setError };
}
