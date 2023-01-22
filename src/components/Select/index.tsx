import { Combobox } from "@headlessui/react";
import { useState } from "react";

interface SelectProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: "default" | "autocomplete";
  value?: string;
  autoComplete?: string;
  onChange: any;
  error?: string;
  className?: string;
  options: any[];
}

function Select({
  id,
  label,
  name,
  placeholder,
  type = "default",
  value = "",
  onChange,
  error = "",
  className = "",
  autoComplete,
  options = [],
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const filteredOption =
    value === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(value.toLowerCase());
        });

  if (type === "autocomplete") {
    return (
      <div>
        <label className="mb-2">{label}</label>
        <Combobox value={selectedOption} onChange={setSelectedOption}>
          <Combobox.Input
            id={id}
            name={name}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            className={`base-input w-full p-4 rounded-lg border-2 ${
              error ? "base-border-red" : "border-gray-200"
            } relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
          />
          <Combobox.Options
            className={"py-5 bg-white border mt-2 absolute rounded-lg"}
          >
            {filteredOption.map((option) => (
              <Combobox.Option
                key={option}
                value={option || ""}
                className={"px-5 py-2 hover:bg-gray-200 cursor-pointer"}
              >
                {option}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        className={`base-input w-full p-4 rounded-lg border-2 ${
          error ? "base-border-red" : "border-gray-200"
        } relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
