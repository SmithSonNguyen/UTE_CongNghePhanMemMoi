import React from "react";

interface CardProps {
  title: string;
  content: string;
  image?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  image,
  children,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        width: "200px",
      }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <h3>{title}</h3>
      <p>{content}</p>
      {children}
    </div>
  );
};
