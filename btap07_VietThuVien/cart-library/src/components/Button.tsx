import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
  variant = "primary",
}) => {
  const bgColor = variant === "primary" ? "#007bff" : "#6c757d";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 16px",
        backgroundColor: bgColor,
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "4px",
      }}
    >
      {label}
    </button>
  );
};
