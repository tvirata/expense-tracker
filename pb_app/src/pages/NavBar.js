import pb from "lib/pocketbase";
import { Link } from "react-router-dom";
// import pb from "lib/pocketbase";
import { useState, useEffect } from "react";

export default function NavBar() {
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
  if (pb.authStore.isValid) {
    return (
      <ul className="menu">
        <Link className="menu-item" to="">
          Home
        </Link>
        <Link className="menu-item" to="history">
          History
        </Link>
        <Link className="menu-item" to="about">
          About Us
        </Link>
        <li className="blank"></li>
        <Link className="menu-item" to="">
          <button onClick={logout}>Logout</button>
        </Link>
      </ul>
    );
  } else {
    return (
      <ul className="menu">
        <Link className="menu-item" to="">
          Home
        </Link>
        <Link className="menu-item" to="history">
          History
        </Link>
        <Link className="menu-item" to="about">
          About Us
        </Link>
        <li className="blank"></li>
        <Link className="menu-item" to="login">
          Log In
        </Link>
        <li className="blank"></li>
        <Link className="menu-item" to="signup">
          Sign Up
        </Link>
      </ul>
    );
  }
}
