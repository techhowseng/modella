import React from "react";

interface InputProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  value?: string;
  autoComplete?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  className?: string;
}

function Input({
  id,
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  error = "",
  className = "",
  autoComplete,
}: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2">{label}</label>}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          // value={value || ""}
          onChange={onChange}
          className={`base-input w-full p-4 rounded-lg border-2 ${
            error ? "base-border-red" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          defaultValue={value}
          onChange={onChange}
          className={`base-input w-full p-4 rounded-lg border-2 ${
            error ? "base-border-red" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
        />
      )}
      <p className="base-red">{error}</p>
    </div>
  );
}

export default Input;
