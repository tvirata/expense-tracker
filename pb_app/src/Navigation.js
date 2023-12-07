import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Site Name
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/history">My History</CustomLink>
        <CustomLink to="/goals">Goals</CustomLink>
        <CustomLink to="/about">About Us</CustomLink>
        <CustomLink to="/login">Log In</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
