import "./UserCard.css";
import React from "react";

type UserProps = { username: string; email: string; isActive: boolean; };

export const UserCard: React.FC<UserProps> = ({ username, email, isActive, }) => {

  return (
  <div className={`user-card ${!isActive ? "user-disabled" : ""}`}>
  <p>Username: {username}</p>
  <p>Email: {email}</p>
  </div>

  );

};
