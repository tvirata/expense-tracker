export default function Navigation() {
  const path = window.location.pathname;
  return (
    <ul className="menu">
      <li className="menu-item">
        <a href="/">Home</a>
      </li>
      <li className="menu-item">
        <a href="/history">My History</a>
      </li>
      <li className="menu-item">
        <a href="/goals">Goals</a>
      </li>
      <li className="menu-item">
        <a href="/about">About Us</a>
      </li>
      <li className="menu-item">
        <a href="/login">Log In</a>
      </li>
    </ul>
  );
}
