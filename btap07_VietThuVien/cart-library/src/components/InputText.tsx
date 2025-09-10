import React from "react";

interface InputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
  );
};
