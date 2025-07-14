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
  edited: boolean;
};

export const PostCard: React.FC<PostProps> = ({ _id, author,title,content,likes,edited,
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
        <div className="post-author">
          By: <strong>{author.username}</strong>{" "}
          <i>{edited ? ` (edited)` : ""}</i>
        </div>
        <div className="post-likes">
          <button>Likes: {likes.length}</button>
        </div>
      </footer>
    </div>
  );
};