import React, { FormEvent, useState } from "react";
import useHttp from "../hooks/useHttp";

//import components

export default function AuthPage() {
  const [form, setForm] = useState<{ login: string; password: string }>({
    login: "",
    password: "",
  });

  const { loading, error, request, clearError } = useHttp();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearError();
    const data = await request("/api/auth/login", "POST", form);
    console.log(data);
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
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          submit
        </button>
      </form>
    </div>
  );
}

//styles
