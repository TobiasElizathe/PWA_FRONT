// src/pages/Posts.tsx
import "./Post.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../config/axios";                // ← instancia centralizada
import { TitleHeader }   from "../../components/TitleHeader/TitleHeader";
import { PostCard }    from "../../components/PostCard/PostCard";

export type PostProps = {
  _id: string;
  author: {
    _id: string;
    username: string;   // llegará si tu back hace populate
    email: string;
  };
  title: string;
  content: string;
  likes: string[];
  edited: boolean;
};

export const Posts = () => {
  /* ----- state ----- */
  const [posts,  setPosts]  = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const navigate = useNavigate();

  /* ----- fetch all posts ----- */
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("http://localhost:5000/api/posts");        // back popula author.username
        setPosts(res.data.data);
      } catch {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ----- ui ----- */
  if (loading) return <p>Loading…</p>;
  if (error)   return <p>{error}</p>;

  return (
    <section className="posts">
      <TitleHeader title="Posts" subtitle="See all posts from every user" />

      <button className="create-btn" onClick={() => navigate("./postCreate/PostCreate")}>
        + Crear post
      </button>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card-container">
            <PostCard
              _id={post._id}
              author={post.author}
              title={post.title}
              content={post.content}
              likes={post.likes}
              edited={post.edited}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
