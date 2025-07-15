import "./UserCard.css";
import React from "react";

type Props = {
  username: string;
  email: string;
  isActive: boolean;
};

export const UserCard: React.FC<Props> = ({ username, email, isActive }) => (
  <article className={`ucard ${!isActive ? "ucard--off" : ""}`}>
    <span className="ucard__row">
      <strong>Username:</strong>&nbsp;{username}
    </span>
    <span className="ucard__row">
      <strong>Email:</strong>&nbsp;{email}
    </span>
  </article>
);
