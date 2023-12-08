import pb from "lib/pocketbase";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [dummy, reload] = useState(false);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [collec, setCollec] = useState("");

  const adminuser = "admin@gmail.com";
  const adminpass = "adminadmin";

  async function regnew(data) {
    setLoading(true);
    const newuser = {
      email: data.r_user,
      emailVisibility: true,
      password: data.r_pass,
      passwordConfirm: data.r_pass,
    };
    try {
      const anotheruser = await pb.collection("users").create(newuser);
      const authData = await pb.admins.authWithPassword(adminuser, adminpass);
      const getusername = anotheruser.email.substring(
        0,
        anotheruser.email.lastIndexOf("@")
      );
      localStorage.setItem("currentuser", JSON.stringify(getusername));
      const base = await pb.collections.create({
        name: getusername,
        type: "base",
        listRule: "",
        viewRule: "",
        createRule: "",
        updateRule: "",
        deleteRule: "",
        schema: [
          {
            name: "name",
            type: "text",
            required: true,
          },
          {
            name: "cost",
            type: "number",
            required: true,
          },
        ],
      });
    } catch (e) {
      alert(e);
    }
    const authData = await pb
      .collection("users")
      .authWithPassword(newuser.email, newuser.passwordConfirm);
    alert("NEW ACCOUNT CREATED!");
    setLoading(false);
    reset();
    reload(!dummy);
  }
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>Register New Account</h1>
      <div className="login">
        <form onSubmit={handleSubmit(regnew)}>
          <input type="text" placeholder="email" {...register("r_user")} />
          <input
            type="password"
            placeholder="password"
            {...register("r_pass")}
          />
          <button type="submit" disabled={isLoading}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}
