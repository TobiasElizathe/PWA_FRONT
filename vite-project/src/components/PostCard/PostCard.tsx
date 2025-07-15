import "./PostCard.css";
import React from "react";
import { Link } from "react-router-dom";  // Ojo, debe ser react-router-dom, no react-router

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

export const PostCard: React.FC<PostProps> = ({
  _id,
  author,
  title,
  content,
  likes,
  edited,
}) => {
  return (
    <div className="post-card">
      <header className="post-card__title">
        <Link to={`/PostPanel/${_id}`}>
          <strong>{title}</strong>
        </Link>
      </header>

      <main className="post-card__content">{content}</main>

      <footer className="post-card__footer">
        <div className="post-card__author">
          By: <strong>{author.username}</strong> {edited && <i>(edited)</i>}
        </div>
        <div className="post-card__likes">
          <button>Likes: {likes.length}</button>
        </div>
      </footer>
    </div>
  );
};
