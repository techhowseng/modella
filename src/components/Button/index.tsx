import Loading from "components/loading";
import React from "react";

function Button({
  type = "button",
  children,
  onClick,
  className = "",
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  ...rest
}: {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
}) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={`w-full md:w-[180px] lg:w-[200px] !base-bg-color py-3 px-8 text-white font-semibold rounded-lg hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
        disabled && "opacity-50 cursor-not-allowed"
      } ${className} `}
    >
      {loading ? (
        <p>
          <Loading />
          {loadingText}
        </p>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
