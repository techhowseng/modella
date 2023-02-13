import React from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const PasswordVisibilty = ({ initialType, inputType, setInputType }: any) => {
  return (
    <a
      role="button"
      href="#"
      onClick={() => {
        if (inputType !== "text") {
          setInputType("text");
        } else {
          setInputType(initialType);
        }
      }}
    >
      {inputType === "password" ? (
        <HiOutlineEye className="absolute top-4 right-4" size={24} />
      ) : (
        <HiOutlineEyeOff className="absolute top-4 right-4" size={24} />
      )}
    </a>
  );
};

export default PasswordVisibilty;
