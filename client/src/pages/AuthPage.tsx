import React, { FormEvent, useState } from "react";
import useHttp from "../hooks/useHttp";

//import components

export default function AuthPage() {
  const [form, setForm] = useState<{ login: string; password: string }>({
    login: "",
    password: "",
  });

  const { loading, error, request, setError } = useHttp();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setError("");
    e.preventDefault();
    try {
      const data = await request("/api/auth/login", "POST", form);
      console.log(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="login"
          placeholder="login"
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          submit
        </button>
      </form>
    </div>
  );
}

//styles
