import pb from "lib/pocketbase";
import { useState, useEffect } from "react";

const LogOut = () => {
  const [dummy, reload] = useState(false);
  const [collec, setCollec] = useState("");

  const adminuser = "admin@gmail.com";
  const adminpass = "adminadmin";

  function logout() {
    pb.authStore.clear();
    setCollec(""); // Reset the collection on logout
    localStorage.removeItem("currentuser");
    window.location.reload();
    reload(!dummy);
  }
  return <button onClick={logout}>Logout</button>;
};

export default LogOut;
