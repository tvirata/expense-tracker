import pb from "lib/pocketbase";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LogIn() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [dummy, reload] = useState(false);

  const adminuser = "admin@gmail.com";
  const adminpass = "adminadmin";

  async function login(data) {
    setLoading(true);
    try {
      const authData = await pb.collection('users').authWithPassword(data.user, data.pass);
      console.log(authData.record.id);
      const getusername = authData.record.id;
      localStorage.setItem("currentuser", JSON.stringify(getusername));
    } catch (e) {
      alert(e);
    }
    setLoading(false);
    reset();
    window.location.href="history";
    reload(!dummy);
  }
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>Log In</h1>
      <div className="login">
        <form onSubmit={handleSubmit(login)}>
          <input type="text" placeholder="email" {...register("user")} />
          <input type="password" placeholder="password" {...register("pass")} />
          <div className="centerButton">
            <button type="submit" disabled={isLoading}>Log In</button>
          </div>
        </form>
      </div>
    </>
  );
}
