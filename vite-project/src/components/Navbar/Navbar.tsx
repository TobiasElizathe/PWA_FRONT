import "./Navbar.css";
import batman from "../../assets/batman.png";
import { Link } from "react-router";

export const Navbar = () => {
  return (
  <nav className="navbar">
  <div className="logo">
    <Link to="/">
      <img src={batman} alt="batman" />
    </Link>
  </div>
        <ul>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/createPost">Create Posts</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
        </ul>
    </nav>
  );
};
