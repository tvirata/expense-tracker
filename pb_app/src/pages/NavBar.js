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
      <header className="header">
        <div class="topnav">
          <a href="/"> Home </a>
          <a href="history"> Expense Tracker </a>
          <a href="about"> About Us </a>
          <div className="blank"></div>
          <a
            // style={{ marginLeft: "65%" }}
            className="logoutbutt"
            href="/"
            onClick={logout}
          >
            {" "}
            Logout <i class="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <div class="topnav">
          <a href="/"> Home </a>
          <a href="history"> Expense Tracker </a>
          <a href="about"> About Us </a>
          <div className="blank"></div>
          <a href="login"> Log In </a>
          <a style={{ marginLeft: "0" }} className="regbutt" href="signup">
            {" "}
            Sign Up{" "}
          </a>
        </div>
      </header>
    );
  }
}
