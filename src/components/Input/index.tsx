import React from "react";

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

function Input({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  error = "",
  className = "",
}: InputProps) {
  return (
    <div className="flex flex-col mt-10">
      <label className="mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={value}
        onChange={onChange}
        className={`base-input w-full p-4 rounded-lg border-2 ${
          error ? "base-border-red" : "border-gray-200"
        } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
      />
      <p className="base-red">{error}</p>
    </div>
  );
}

export default Input;
