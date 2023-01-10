import React, { Children } from "react";

interface CheckBoxProps {
  id?: string;
  label?: string;
  name: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function CheckBox({
  id,
  label,
  name,
  checked,
  onChange,
  error = "",
  className = "",
  children,
}: CheckBoxProps) {
  return (
    <div className="flex items-center mt-10">
      <input
        id={id}
        name={name}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        className={`h-4 w-4 rounded border-gray-300 base-color focus:ring-indigo-500 ${className}`}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {children}
      </label>
    </div>
  );
}

export default CheckBox;
