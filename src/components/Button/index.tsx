import React from "react";

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full md:w-[180px] lg:w-[200px] base-bg-color py-3 px-8 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      {children}
    </button>
  );
}

export default Button;
