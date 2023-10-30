import Loading from "components/loading";
import Link from "next/link";
import React from "react";

function Button({
   type = "button",
   children,
   href,
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
   href?: string;
}) {
   if (href) {
      return (
         <Link
            {...rest}
            href={href}
            className={`w-full md:w-[100%] lg:w-[100%] !base-bg-color py-3 px-8 text-white font-semibold rounded-xl hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${disabled && "opacity-50 cursor-not-allowed"
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
         </Link>
      );
   }
   return (
      <button
         {...rest}
         disabled={disabled || loading}
         type={type}
         onClick={onClick}
         className={`w-full !base-bg-color py-3 px-8 text-white font-semibold rounded-[16px] hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${disabled && "opacity-50 cursor-not-allowed"
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
