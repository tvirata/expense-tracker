import pb from "lib/pocketbase";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [dummy, reload] = useState(false);
  async function login(data) {
    setLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(data.user, data.pass);
    } catch (e) {
      alert(e);
    }

    setLoading(false);
  }
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>
        Log In
        {/* Logged In Status: {pb.authStore.isValid.toString()} */}
      </h1>
      <form onSubmit={handleSubmit(login)}>
        <input type="text" placeholder="username" {...register("user")} />
        <br />
        <input
          style={{ marginTop: 10 }}
          type="password"
          placeholder="password"
          {...register("pass")}
        />
        <br />
        <button style={{ marginTop: 10 }} type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </>
  );
}
