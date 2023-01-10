import Link from "next/link";
import React from "react";

function LinkButton({ children, href, className = "" }) {
  return (
    <Link
      href={href}
      className={`text-center w-full md:w-[180px] lg:w-[200px] base-bg-color py-3 px-8 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className} `}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
