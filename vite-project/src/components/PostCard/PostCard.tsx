import "./PostCard.css";
import React from "react";
import { Link } from "react-router";

type PostProps = {
  _id?: string;
    author: {
    _id: string;
    username: string;
    email: string;
    };

  title: string;
  content: string;
  likes: string[];
};

export const PostCard: React.FC<PostProps> = ({ _id, author,title,content,likes,
}) => {
  return (
    <div className="post-card">
      <header className="post-title">
        <Link to={`/PostDashboard/${_id}`}>
          <strong>{title}</strong>
        </Link>
      </header>
      <main className="post-content">{content}</main>
      <footer className="post-footer">
        <div className="post-author">By: {author.username}</div>
        <div className="post-likes">
          <button>Likes: {likes.length}</button>
        </div>
      </footer>
    </div>
  );
};