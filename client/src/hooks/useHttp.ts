import { useState } from "react";

export default function useHttp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function request(
    url: string,
    method: string,
    body: { login: string; password: string }
  ) {
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
      return data;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        setLoading(false);
      }
    }
  }

  return { loading, error, request, setError };
}
