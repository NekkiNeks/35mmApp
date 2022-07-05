import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useHttp from "../hooks/useHttp";

export default function RegisterPage() {
  const [form, setForm] = useState<{ login: string; password: string }>({
    login: "",
    password: "",
  });

  const { error, loading, request, setError } = useHttp();
  const { login } = useAuth();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setError(null);
    e.preventDefault();

    try {
      const res = await request("/api/auth/login", "POST", {}, form);
      if (res.status === "error") throw new Error(res.data.message);
      if (res.data.jwt && res.data.userId) login(res.data.jwt, res.data.userId);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div>
      <h1>Register new user</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <Link to="/auth">Login</Link>
      </form>
    </div>
  );
}
