import "./TitleHeader.css";
import React from "react";

type HeaderProps = {
  title: string;
  subtitle: string;
};
export const TitleHeader: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
        <div className="header">
          <h1 className="title">{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
  );
};