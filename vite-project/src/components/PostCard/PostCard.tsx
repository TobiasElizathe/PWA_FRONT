import "./PostCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axios";

export type PostProps = {
  _id?: string;
  author: { _id: string; username: string; email: string };
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
  /* -------- los state -------- */
  const loggedUser = JSON.parse(localStorage.getItem("user") || "null");
  const userId: string | null = loggedUser?._id ?? null;

  const [likeList, setLikeList] = useState<string[]>(likes);
  const hasLiked = userId ? likeList.includes(userId) : false;

  /* -------- like y unlike -------- */
  const onToggleLike = async () => {
    if (!userId || !_id) return;

    try {
      const { data } = await axiosInstance.patch(`/posts/${_id}/like`, {
        userId,
      });
      setLikeList(data.data.likes);
    } catch (err) {
      console.error("Could not toggle like:", err);
    }
  };

  /* -------- render -------- */
  return (
    <article className="pcard">
      <header className="pcard__head">
        <Link to={`/postPanel/${_id}`} className="pcard__link">
          {title}
        </Link>
      </header>

      <p className="pcard__body">{content}</p>

      <footer className="pcard__foot">
        <span className="pcard__author">
          By <strong>{author.username}</strong>
          {edited && <em> (edited)</em>}
        </span>

        <button
          onClick={onToggleLike}
          disabled={!userId}
          className={
            !userId
              ? "pcard__btn pcard__btn--disabled"
              : hasLiked
              ? "pcard__btn pcard__btn--active"
              : "pcard__btn"
          }
        >
          {hasLiked ? "Unlike" : "Like"} ({likeList.length})
        </button>
      </footer>
    </article>
  );
};
