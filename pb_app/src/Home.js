import pb from "lib/pocketbase";
import React from "react";
import { useState } from "react";
import Navigation from "./Navigation";
import History from "./pages/History";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";
import "./App.css";

export default function Home() {
  let isLoggedIn = false;
  const [dummy, reload] = useState(false);

  function logout() {
    pb.authStore.clear();
    reload(!dummy);
    isLoggedIn = false;
    return <Home />;
  }

  if (pb.authStore.isValid) isLoggedIn = true;

  return (
    <>
      <Navigation />
      <Routes className="menu">
        <Route className="menu-item" path="/" element={<Home />} />
        <Route className="menu-item" path="/history" element={<History />} />
        <Route className="menu-item" path="/goals" element={<Goals />} />
        <Route className="menu-item" path="/about" element={<About />} />
        <Route
          className="menu-item"
          path={isLoggedIn ? "/login" : "/home"}
          element={isLoggedIn ? <Login /> : logout()}
        />
      </Routes>
      {/* <ul className="menu">
        <Item value="Home" link="./Home" />
        <Item value="My History" link="./pages/History" />
        <Item value="Goals" link="./pages/Goals" />
        <Item value="About Us" link="./pages/About" />
        <li className="blank"></li>
        <Item
          value={isLoggedIn ? "Log In" : "Log Out"}
          link={isLoggedIn ? "./pages/Login" : logout()}
        />
      </ul> */}
      <h1>Expense Tracker</h1>
      <h2>Log Your Purchases</h2>
      <p>
        This app allows you to log each of your purchases to help you know how
        much you spend, keep track of your spending habits, see where your money
        is going. All of your purchases are saved in the My History tab.
      </p>
      <h2>Make Goals and Limit Spending</h2>
      <p>
        You can add goals to try to reduce spending if you feel that you're
        spending to much. You can add daily limits and adjust the individual
        limit in each category. If your next purchase is going to go over the
        limit, you will be warned before you are able to put it in.
      </p>
      <h2>Get Started</h2>
      <p>
        You can get started by either logging into your existing account or
        creating a new account if you're a new user.
      </p>
    </>
  );
}
