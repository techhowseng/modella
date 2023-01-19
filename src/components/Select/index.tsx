import { Combobox } from "@headlessui/react";
import { useState } from "react";

interface SelectProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
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
  type,
  value = "",
  onChange,
  error = "",
  className = "",
  autoComplete,
  options = [],
}: SelectProps) {
  const [selectedPerson, setSelectedPerson] = useState(options[0]);

  const filteredOption =
    value === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(value.toLowerCase());
        });

  return (
    <div>
      <label className="mb-2">{label}</label>
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input
          id={id}
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          className={`base-input w-full p-4 rounded-lg border-2 ${
            error ? "base-border-red" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
        />
        <Combobox.Options>
          {filteredOption.map((option) => (
            <Combobox.Option key={option} value={option}>
              {option}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default Select;
