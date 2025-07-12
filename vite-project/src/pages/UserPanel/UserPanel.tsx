import "./UserPanel.css";
import { Link } from "react-router";

export const UserPanel = () => {
  return (
    <section className="user-panel">
      <h1>User Panel</h1>
      <Link to="/users">Back to Users</Link>
    </section>
  );
};
