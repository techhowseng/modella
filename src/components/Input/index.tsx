import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import PasswordVisibilty from "./PasswordVisibilty";

interface InputProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  value?: string;
  autoComplete?: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error?: string;
  className?: string;
  options?: any[];
}

function Input({
  id,
  label,
  name,
  placeholder,
  type = "input",
  value,
  onChange,
  error = "",
  className = "",
  autoComplete,
  options = [],
}: InputProps) {
  const [inputType, setInputType] = useState(type);
  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          className={`w-full base-input p-4 rounded-lg border-2 ${
            error ? "base-border-red" : "border-gray-200"
          } focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
          placeholder={placeholder}
        ></textarea>
      );
    }

    if (type === "select") {
      return (
        <select
          id={id}
          name={name}
          defaultValue={value || "---- Select ----"}
          onChange={onChange as any}
          className={`base-input w-full p-4 rounded-lg border-2 ${
            error ? "base-border-red" : "border-gray-200"
          } focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
        >
          <option>---- Select ----</option>
          {options.length > 0 &&
            options.map((opt, index) => {
              if (typeof opt === "object") {
                return (
                  <option key={index} value={opt.value}>
                    {opt.value}
                  </option>
                );
              } else {
                return (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                );
              }
            })}
        </select>
      );
    }

    return (
      <input
        id={id}
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        checked={!!value}
        autoComplete={autoComplete}
        defaultValue={value}
        onChange={onChange}
        className={`base-input ${
          type === "checkbox" ? "w-2/2" : "w-full"
        } p-4 rounded-lg border-2 ${
          error ? "base-border-red" : "border-gray-200"
        } focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
      />
    );
  };

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-2">{label}</label>}
      <div className="relative">
        {renderInput()}
        {type === "password" && (
          <PasswordVisibilty
            initialType={type}
            inputType={inputType}
            setInputType={setInputType}
          />
        )}
      </div>

      <p className="base-red">{error}</p>
    </div>
  );
}

export default Input;
