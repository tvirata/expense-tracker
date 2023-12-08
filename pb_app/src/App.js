import Auth from "Auth";
import pb from "lib/pocketbase";
import React from "react";
import NavBar from "./pages/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import LogIn from "./pages/LogIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import LogOut from "./pages/LogOut";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
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
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/History" element={<History />} />
          <Route path="/About" element={<About />} />
          {/* <Route path="/" element={<LogOut />} /> */}
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/History" element={<History />} />
          <Route path="/About" element={<About />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
