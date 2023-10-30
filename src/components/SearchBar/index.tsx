import Input from "components/Input";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineCases } from "react-icons/md";
import { Button } from "..";
import { jobOptions } from "features/ClientAccount/Components/PostJobBanner/formFieldsData";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

function SearchBar({
   handleChange,
   handleSubmit,
}: {
   handleChange: any;
   handleSubmit: any;
}) {
   if (typeof window === "undefined") return null;

   return (
      <div className="flex items-center justify-between h-[50px] gap-6">
         <div className="bg-white rounded-xl h-full flex items-center w-full px-3 border">
            <FaSearch className="base-color" />
            <input
               type="text"
               name="search"
               placeholder="search..."
               onChange={() => { }}
               className="border-none rounded-lg"
            />
         </div>
         <div className="bg-white rounded-xl h-full flex items-center w-full px-3 border">
            <SlLocationPin className="text-xl base-color" />
            <input
               type="text"
               name="search"
               placeholder="South Africa"
               onChange={() => { }}
               className="border-none rounded-lg"
            />
         </div>
      </div>
   );
}

export default SearchBar;
