import React from "react";
import NavBar from "./pages/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import LogIn from "./pages/Login";
import About from "./pages/About";

function App() {
  return (
  <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/Home" element={<Home />}/>
        <Route path="/History" element={<History />} />
        <Route path="About" element={<About />} />
        <Route path="/LogIn" element={<LogIn />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
