import Input from "components/Input";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineCases } from "react-icons/md";
import { Button } from "..";
import { jobOptions } from "features/ClientAccount/Components/PostJobBanner/formFieldsData";

function SearchBar({
  handleChange,
  handleSubmit,
}: {
  handleChange: any;
  handleSubmit: any;
}) {
  return (
    <div className="flex flex-row py-6 sm:px-6 lg:px-8 lg:sticky top-0 z-10">
      <div className="bg-white p-3 w-full flex flex-col lg:flex-row rounded-lg border justify-between">
        <div className="flex flex-row items-center relative border-r w-full mb-4 lg:mb-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch size={20} />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 pt-3 pb-3 border-none focus:!outline-none"
            name={"search"}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row items-center relative mb-4 lg:mb-0 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiOutlineLocationMarker size={20} />
          </div>
          <Input
            type="address"
            placeholder="Locations"
            className="pl-10 pt-3 pb-3 border-none focus:!outline-none"
            name={"locations"}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row items-center relative mb-4 lg:mb-0 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MdOutlineCases size={20} />
          </div>
          <Input
            type="select"
            initialOption={"Job Type"}
            options={jobOptions}
            placeholder="Job Type"
            className="pl-10 pt-3 pb-3 border-none focus:!outline-none"
            name={"jobType"}
            onChange={handleChange}
          />
        </div>
        <Button
          className="ml-0 md:ml-2 lg:ml-2 !base-bg-color w-full lg:!w-[400px]"
          onClick={handleSubmit}
        >
          Find Jobs
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
