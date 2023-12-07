// import Auth from "Auth";
import Home from "Home";
import Navigation from "./Navigation";
import History from "./pages/History";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import About from "./pages/About";
import "./App.css";

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/history":
      component = <History />;
      break;
    case "/goals":
      component = <Goals />;
      break;
    case "/about":
      component = <About />;
      break;
    case "/login":
      component = <Login />;
      break;
  }
  return (
    <>
      {/* <Auth /> */}
      <Navigation />
      <div className="container">{component}</div>
    </>
  );
}

export default App;
