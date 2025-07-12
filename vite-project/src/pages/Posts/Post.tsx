import "./Post.css";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

type Post = {
  _id: string;
  author: { username: string; _id: string };
  title: string;
  content: string;
  likes: string[]; 
  edited: boolean;
};

export const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const userFromStorage = localStorage.getItem("user");
  const currentUserId = userFromStorage ? JSON.parse(userFromStorage)._id : null;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data.data); 
      } catch (err) {
        setError("Error cargando posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLike = async (postId: string) => {
    if (!currentUserId) {
      alert("Debes estar registrado para dar like");
      return;
    }

    try {
      await axios.put(`/posts/${postId}/like`, {
        userId: currentUserId,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: p.likes.includes(currentUserId)
                  ? p.likes.filter((id) => id !== currentUserId)
                  : [...p.likes, currentUserId],
              }
            : p
        )
      );
    } catch {
      alert("Error al dar like");
    }
  };

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Posts</h1>

      <button onClick={() => navigate("/posts/new")}>Crear post</button>

      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
            style={{ border: "1px solid black", marginBottom: 10, padding: 10 }}
          >
            <Link to={`/posts/${post._id}`}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Autor: {post.author.username}</p>
            </Link>

            <button onClick={() => handleLike(post._id)}>
              {post.likes.includes(currentUserId!) ? "💖 Quitar like" : "♡ Like"} (
              {post.likes.length})
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};


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