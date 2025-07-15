import "./Post.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { PostCard }  from "../../components/PostCard/PostCard";

export type Post = {
  _id: string;
  author: {
    _id: string;
    username?: string;
    email?: string;
  };
  title: string;
  content: string;
  likes: string[];
  edited: boolean;
};

export const Posts = () => {
  const [posts,  setPosts]  = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/posts");
        setPosts(res.data.data);
        if (import.meta.env.DEV) console.log("Posts fetched");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <section className="posts">
      <TitleHeader title="Posts" subtitle="See every user's posts" />

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card-container">
            <PostCard
              _id={post._id}
              author={{
                _id: post.author._id,
                username: post.author.username ?? "N/A",
                email: post.author.email ?? "—",
              }}
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
