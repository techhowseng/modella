import Input from "components/Input";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineCases } from "react-icons/md";
import { Button } from "..";

function SearchBar() {
  return (
    <div className="flex flex-row py-6 sm:px-6 lg:px-8 sticky top-0 z-10">
      <div className="bg-white p-3 w-full flex flex-row rounded-lg border justify-between">
        <div className="flex flex-row items-center relative border-r">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch size={20} />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 pt-3 pb-3 border-none"
            name={"search"}
            onChange={(e: any) => console.log(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiOutlineLocationMarker size={20} />
          </div>
          <Input
            type="text"
            placeholder="Location"
            className="pl-10 pt-3 pb-3 border-none"
            name={"location"}
            onChange={(e: any) => console.log(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MdOutlineCases size={20} />
          </div>
          <Input
            type="text"
            placeholder="Job Type"
            className="pl-10 pt-3 pb-3 border-none"
            name={"jobType"}
            onChange={(e: any) => console.log(e.target.value)}
          />
        </div>
        <Button className="ml-2 !base-bg-color" onClick={() => {}}>
          Find Jobs
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
