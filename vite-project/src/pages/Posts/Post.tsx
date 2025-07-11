import "./Post.css";
import { Link } from "react-router";

export const Post = () => {
    return (
    <section className="post-wrapper">
      <h1>Posts</h1>

      <div className="post-links">
        <Link to="/postPanel">Open post panel</Link>
        <Link to="/">Return to signup</Link>
      </div>
    </section>
  );
}